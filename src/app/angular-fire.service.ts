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

  constructor( private db: AngularFireDatabase,
               private afs: AngularFirestore,
               private afAuth: AngularFireAuth
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
        this.afs.collection('users').add({email: this.afAuth.auth.currentUser.email, displayName: this.afAuth.auth.currentUser.displayName, hex: "data", imageUrl: this.afAuth.auth.currentUser.photoURL, uid: this.afAuth.auth.currentUser.uid, conversationIds: []});
        console.log("user not detected");
        console.log('created user');
      }

    });
  }

  updateLocalInfo(){
    //GRABS USER INFO
    this.afs.collection('users').doc(this.currentDocumentKey).get().subscribe(doc => {
      this.currentUserInfo = doc.data();
      console.log(this.currentUserInfo);
    });
    this.getPastConversations()
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
    this.afs.collection('conversations').doc('TIXOcwhpXZjpW00OaTMl').get().subscribe(doc => {
      this.currentConversationInfo= doc.data();
      console.log(this.currentConversationInfo);
    })
  }

  addChat(data){
    // @ts-ignore
    console.log(this.currentConversationInfo)
    // @ts-ignore
    this.currentConversationInfo.messages.push(data)
    console.log(data);
    this.afs.collection('conversations').doc('TIXOcwhpXZjpW00OaTMl').update(this.currentConversationInfo)

  }
  getPastConversations() {
    // @ts-ignore
    for (let conversation of this.currentUserInfo.conversationIds) {
      this.afs.collection('conversations').doc(conversation).get().subscribe( (doc) => {
        this.pastChats.push(doc.data());
        console.log(this.pastChats)

      })
    }

  }

  refresh(){
    this.updateLocalConversation()
    this.updateLocalInfo()
  }


}



