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
  currentConversation = {};
  currentDocumentKey: string;
  pastChats: [];

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

        console.log(ref.uid + " is the cloud user id");
        console.log(data + " is the local user id");

          if (data == ref.uid && userFound == false) {

            //gets data from the user
            userFound = true;
            console.log(userFound);
            console.log('the user is found! logging in');
            //logs user in
            //sets current users info
            this.currentUserInfo = ref;
            this.currentDocumentKey = doc.id;
            console.log(this.currentUserInfo)
          }
      });

      if (userFound == false) {
        //push user to firestore
        console.log(data);
        this.afs.collection('users').add({
          email: this.afAuth.auth.currentUser.email,
          displayName: this.afAuth.auth.currentUser.displayName,
          hex: "data",
          imageUrl: this.afAuth.auth.currentUser.photoURL,
          uid: this.afAuth.auth.currentUser.uid});

        console.log("user not detected");
        console.log('created user');
      }

    });
  }

  addChatArray(chats){
    //ADDS CHAT DATA TO CONVERSATIONS
    console.log(this.currentUserInfo);
    this.updateLocalInfo()

  }

  getPastChats(){
    //UPDATES LOCAL USER'S CHATS
    console.log(this.currentDocumentKey);
    this.afs.collection('users').doc(this.currentDocumentKey).get().subscribe( document => {
      console.log("document: " + document);
      console.log("document.data(): " + document.data());
      return
    })
  }

  updateLocalInfo(){
    //GRABS USER INFO
    this.afs.collection('users').doc(this.currentDocumentKey).get().subscribe(doc => {
      this.currentUserInfo = doc.data()
    })
  }

  getCurrentUserID(){
    //GRABS USER ID
    return this.currentDocumentKey;
  }

  newMessage(data){
    this.afs.collection('conversation').doc(this.currentDocumentKey).update(data.conversationdata)
  }

  newConversation(title, destination){
    let conversation = {
      title: title,
      users: [],
      messages:[],
      admin: ''
    }
    // console.log(data.conversationdata);
    // this.afs.collection('conversations').add(conversations);
  }

  // getConversation(){
  //   this.currentConversation = this.afs.collection('conversation').doc(this.currentDocumentKey).get().subscribe( doc => {
  //     this.currentConversation = doc.data();
  //   })
  //   return this.currentConversation;
  // }


}
