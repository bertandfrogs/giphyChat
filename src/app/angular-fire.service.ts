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
        console.log(doc.data());

        ref = doc.data();

        console.log(ref.uid + " is the cloud user id");
        console.log(data + " is the local user id");

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
            console.log(this.currentUserInfo)
          }
      });

      if (userFound == false) {
        //push user to firestore
        console.log(data);
        this.afs.collection('users').add({email: "email", firstName: "name", hex: "data", imageUrl: "data", lastName: "data", uid: data});
        console.log("user not detected");
        console.log('created user');
      }

    });
  }

  addChatArray(chats){
    //ADDS CHAT DATA TO CONVERSATIONS

    this.afs.collection('users').doc(this.currentDocumentKey).update({chats: [{title: chats, conversation: []}]});
    console.log(this.currentUserInfo);
    this.updateLocalInfo()

  }

  getPastChats(){
    //UPDATES LOCAL USER'S CHATS
    console.log(this.currentDocumentKey);
    this.afs.collection('users').doc(this.currentDocumentKey).get().subscribe( document => {
      console.log("document: " + document);
      console.log("document.data(): " + document.data());
    })
  }

  updateLocalInfo(){
    //GRABS USER INFO
    this.afs.collection('users').doc(this.currentDocumentKey).get().subscribe(doc => {
      this.currentUserInfo = doc.data().chats
      console.log(this.currentUserInfo[0].conversation)
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





  }

}
