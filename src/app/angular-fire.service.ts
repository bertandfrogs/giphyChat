import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {Observable} from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AngularFireService {
  users: Observable<any[]>;
  currentUserInfo = {};
  currentConversationInfo = {};
  currentDocumentKey: string;
  pastChats = [];
  userList = [];
  conversationIds = [];
  private currentDoc: Object;

  constructor( private db: AngularFireDatabase,
               private afs: AngularFirestore,
               private afAuth: AngularFireAuth
               ) {}


  getUser (data): void {

    let userFound = false;
    let ref;

      this.afs.collection('users').get().subscribe(documents => {

      documents.forEach(doc => {

        ref = doc.data();

          if (data == ref.uid && userFound == false) {

            //gets data from the user
            userFound = true;
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
        this.afs.collection('users').add({email: this.afAuth.auth.currentUser.email, displayName: this.afAuth.auth.currentUser.displayName, hex: "data", imageUrl: this.afAuth.auth.currentUser.photoURL, uid: this.afAuth.auth.currentUser.uid, conversationIds : []});
        console.log("user not detected");
        console.log('created user');
      }

    });
  }

  addChatArray(chats){
    //ADDS CHAT DATA TO CONVERSATIONS
    this.updateLocalInfo()

  }

  getPastChats(){
    //UPDATES LOCAL USER'S CHATS
    // this.afs.collection('users').doc(this.currentDocumentKey).get().subscribe( document => {
    // })
  }

  updateLocalInfo(){
    //GRABS USER INFO
    this.afs.collection('users').doc(this.currentDocumentKey).get().subscribe(doc => {
      console.log(this.currentUserInfo);
      this.getPastConversations();
        this.currentUserInfo = doc.data().chats;
    });

  }

  getCurrentUserID(){
    //GRABS USER ID
    return this.currentDocumentKey;
  }

  newMessage(data){
    this.afs.collection('conversation').doc(this.currentDocumentKey).update(data.conversationdata)
  }

  newConversation(title){

    let conversation ={
      title: title,
      users: [],
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

          })
          .catch(error => console.error("Error adding document: ", error))

  }


  updateLocalConversation(){
    this.afs.collection('conversations').doc('TIXOcwhpXZjpW00OaTMl').get().subscribe(function(doc) {
      this.current.conversationdata.push(doc.data().messages);
      console.log(doc.data().messages)
    });
  }

  getConversation() {
      this.currentConversationInfo = this.afs.collection('conversation').doc(this.currentDocumentKey).get().subscribe(doc => {
          this.currentConversationInfo = doc.data();
      });
      return this.currentConversationInfo;
  }
    addChat(data)
    {
        // @ts-ignore
        this.currentConversationInfo.messages.push(data);
        console.log(data);
        this.afs.collection('conversations').doc('TIXOcwhpXZjpW00OaTMl').update(this.currentConversationInfo)

    }
    getPastConversations() {
        // @ts-ignore
        for (let conversation of this.currentUserInfo.conversationIds) {
            this.afs.collection('conversations').doc(conversation).get().subscribe((doc) => {
                this.pastChats.push(doc.data());
                console.log(this.pastChats)
            })
        }
    }
    getUserList()
    {
        this.afs.collection('users').get().subscribe(documents => {
            documents.forEach(doc => {
                if (this.afAuth.auth.currentUser.displayName != doc.data().displayName) {
                    this.userList.push(doc.data().displayName);
                }
            })
        })
    }
}






