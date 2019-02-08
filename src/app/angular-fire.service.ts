import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {Observable} from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireAuth} from "@angular/fire/auth";
import {Router} from '@angular/router';
import {ICurrentUserInfo} from './shared/currentUserInfo';

@Injectable({
  providedIn: 'root'
})
export class AngularFireService {

  users: Observable<any[]>;
  currentUserInfo: {};
  currentConversationInfo = {};
  currentDocumentKey: string;
  currentChatKey : string;
  pastChats = [];
  hexColor: string;
  userList = [];

  constructor( private db: AngularFireDatabase,
               private afs: AngularFirestore,
               private afAuth: AngularFireAuth,
               private router: Router
               ) {
  }


  getUser (data): void {

    let userFound = false;
    var ref;

    this.afs.collection('users').get().subscribe(documents => {

      documents.forEach(doc => {

        ref = doc.data();

          if (data == ref.uid && userFound == false) {

            console.log("match has been found");

            //gets data from the user
            userFound = true;
            console.log(userFound);
            console.log('the user is found! logging in');
            //logs user in
            //sets current users info
            this.currentUserInfo = ref;
            this.currentDocumentKey = doc.id;
            this.updateLocalInfo();
            console.log(this.currentUserInfo)
          }
      });

      if (userFound == false) {


        //push user to firestore
        console.log(data);
        this.afs.collection('users').add({email: this.afAuth.auth.currentUser.email, displayName: this.afAuth.auth.currentUser.displayName, hex: 'data', imageUrl: this.afAuth.auth.currentUser.photoURL, uid: this.afAuth.auth.currentUser.uid, conversationIds: []}).then((response)=> {
          this.currentDocumentKey = response.id;
          this.assignUserColor();
          console.log("user not detected");
          console.log('created user');
          this.getUser(data)
          // window.location.reload()
        });
      }

    });
  }

  updateLocalInfo(){
    //GRABS USER INFO
    this.afs.collection('users').doc(this.currentDocumentKey).get().subscribe(doc => {
      this.currentUserInfo = doc.data();
      console.log(this.currentUserInfo);
      this.getPastConversations();
    });
  }

  getCurrentUserID(){
    //GRABS USER ID
    return this.currentDocumentKey;
  }

  newMessage(data){
    this.afs.collection('conversation').doc(this.currentDocumentKey).update(data.conversationdata)
  }

  newConversation(title, members){

    let conversation ={
      title: title,
      users: members,
      messages:[],
      admin: this.afAuth.auth.currentUser.displayName,
    };
      this.afs.collection("conversations").add({
          conversation
      })
          .then(docRef => {
              // console.log(this.currentDocumentKey);
              console.log("Document written with ID: ", docRef.id);
              console.log(this.currentUserInfo);
              // @ts-ignore
              this.currentUserInfo.conversationIds.push(docRef.id);
              this.afs.collection('users').doc(this.currentDocumentKey).update(this.currentUserInfo);
            this.getPastConversations();
          })
          .catch(error => console.error("Error adding document: ", error))

  }


  updateLocalConversation(){
    this.afs.collection('conversations').doc(this.currentChatKey).get().subscribe(doc => {
      this.currentConversationInfo= doc.data();
      console.log(this.currentConversationInfo);
    })
  }

  addChat(data){
    // @ts-ignore
    console.log(this.currentConversationInfo);
    // @ts-ignore
    this.currentConversationInfo.conversation.messages.push(data);

    console.log(data);
    this.afs.collection('conversations').doc(this.currentChatKey).update(this.currentConversationInfo)

  }
  getPastConversations() {
    this.pastChats = [];
    // @ts-ignore
    for (let conversation of this.currentUserInfo.conversationIds) {
      this.afs.collection('conversations').doc(conversation).get().subscribe( (doc) => {
        this.pastChats.push(doc.data());
        console.log(this.pastChats)

      })
    }

  }

  setCurrentConversationId (element) {
    // var target = element.target || element.srcElement;
    // var id = target.id;
    // var parent = target.parentNode.id;
    // console.log(target);
    // console.log(id);
    console.log(element);
    this.router.navigate(['/chat']);
    this.currentChatKey = element;

  }
  refresh(){
    this.updateLocalConversation();
    this.updateLocalInfo()
  }

  assignUserColor () {
    const hexColor = ['#008744', '#0057e7', '#d62d20', '#ffa700', '#6739B6', '#E91E64', '#9C27B0', '#6ed3cf', '#9068be', '#e1e8f0', '#e62739', '#7dce94', '#fa625f', '#600473', '#313d4b', '#DCAE1D'];
    // @ts-ignore
    this.currentUserInfo.hex = hexColor[Math.floor(Math.random() * 16)];

    this.afs.collection('users').doc(this.currentDocumentKey).update(this.currentUserInfo);
  }

  getUserList() {
      this.afs.collection('users').get().subscribe(documents => {
          documents.forEach(doc => {
              if (this.afAuth.auth.currentUser.uid != doc.data().uid) {
                  this.userList.push(doc.data());
              }
          })
      });
  }

  findUserFromUserID(userId){
    return  this.afs.collection('users').get()

    }


  }



