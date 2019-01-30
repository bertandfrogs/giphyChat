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

        console.log(ref.id + " is the cloud user id");
        console.log(data + " is the local user id");

          if (data == ref.id && userFound == false) {

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
        this.afs.collection('users').add({id: data, chats: []});
        console.log("user not detected");
        console.log('created user');
      }

    })
  }

  addChatArray(chats){
    this.afs.collection('users').doc(this.currentDocumentKey).update({chats: [{title: chats, conversation: []}]});
  }

  getPastChats(){
    this.afs.collection('users').doc(this.currentDocumentKey).get().subscribe( document => {
      console.log(document);
      console.log(document.data());
    })
  }

  deleteChatArray(){

  }

}
