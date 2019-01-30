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

        ref = doc.data();
<<<<<<< HEAD
          if (data == ref.id && userFound == false) {
=======

        console.log(ref.uid + " is the cloud user id");
        console.log(data + " is the local user id");

          if (data == ref.uid && userFound == false) {

            console.log("match has been found");

>>>>>>> 714f3e9cabeb340b974187d73fca427c1431a3f3
            //gets data from the user
            userFound = true;
            //logs user in
            //sets current users info
            this.currentUserInfo = ref;
            this.currentDocumentKey = doc.id;
          }
      });

      if (userFound == false) {
        //push user to firestore
<<<<<<< HEAD
        this.afs.collection('users').add({id: data, chats: []});
=======
        console.log(data);
        this.afs.collection('users').add({email: "email", firstName: "name", hex: "data", imageUrl: "data", lastName: "data", uid: data});
        console.log("user not detected");
        console.log('created user');
>>>>>>> 714f3e9cabeb340b974187d73fca427c1431a3f3
      }

    });
  }

  addChatArray(chats){
    this.afs.collection('users').doc(this.currentDocumentKey).update({chats: [{title: chats, conversation: []}]});
<<<<<<< HEAD
=======

    console.log(this.currentUserInfo);
    this.updateLocalInfo()

>>>>>>> 714f3e9cabeb340b974187d73fca427c1431a3f3
  }

  getPastChats(){
    console.log(this.currentDocumentKey);
    this.afs.collection('users').doc(this.currentDocumentKey).get().subscribe( document => {
      console.log("document: " + document);
      console.log("document.data(): " + document.data());
    })
  }

  addChats(data){
    const chats = [];
    // const chat = {
    //   conversations: [],
    //   title: [{
    //     id: 1,
    //     name: this.curre
    //   }],

    //}
    console.log(data.conversationdata);
    this.afs.collection('users').doc(this.currentDocumentKey).update({'chats': [{title: this.currentUserInfo[0].title[0], conversation: data.conversationdata[0]}]});
    // {chats: [{conversation: data.conversationdata}]}
  }

  updateLocalInfo(){
    this.afs.collection('users').doc(this.currentDocumentKey).get().subscribe(doc => {
      this.currentUserInfo = doc.data().chats
      console.log(this.currentUserInfo[0].conversation)
    })
  }

  getCurrentUserID(){
    return this.currentDocumentKey;
  }

  deleteChatArray(){

  }

}
