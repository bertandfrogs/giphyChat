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
          if (data == ref.id && userFound == false) {
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
        this.afs.collection('users').add({id: data, chats: []});
      }

    })
  }

  addChatArray(chats){
    this.afs.collection('users').doc(this.currentDocumentKey).update({chats: [{title: chats, conversation: []}]});
  }

  getPastChats(){

  }

  deleteChatArray(){

  }

}
