import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {DialogComponent} from "./dialog/dialog.component";
import {AngularFireService} from "../angular-fire.service";
import { AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import { AngularFirestore } from 'angularfire2/firestore'
import {AuthLoginService} from "../auth-login/auth-login.service";



@Component({
  selector: 'app-giphy-titles',
  templateUrl: './giphy-titles.component.html',
  styleUrls: ['./giphy-titles.component.css']
})

export class GiphyTitlesComponent implements OnInit {
  chatList = [];
  noContentInList = true;
  deleteToggle = false;
  id = 0;


  chatName: string;
  chatMembers: string[] = [];
  conversation: string[] = [];

  constructor(public dialog: MatDialog,
              public fireService: AngularFireService,
              private afAuth: AngularFireAuth,
              private router: Router,
              private ab: AngularFireService,
              private afs: AngularFirestore,
              private db: AuthLoginService
  ) {
  }

  ngOnInit(){
    if(!this.afAuth.auth.currentUser){
        this.router.navigate(['/login']);
        console.log(this.afAuth.auth.currentUser);
    }
    else{
        this.ab.userList = [];
        this.ab.getUserList();
        this.ab.updateLocalInfo();
    }

  }

  addChat() {
    this.unDelete();
    this.openDialog();
    this.noContentInList = false;
    this.id++;
  }
  setToggleTrue () {
    this.deleteToggle = true;
  }
  // this will delete the conversation from both the users view and firebase
  deleteConversation(key, i) {
    this.afs.collection('conversations').doc(key).delete();
    // @ts-ignore
    this.ab.currentUserInfo.conversationIds.splice(i, 1);
    this.afs.collection('users').doc(this.ab.currentDocumentKey).update(this.ab.currentUserInfo).then( () => {
      this.ab.getPastConversations();
    });
  }

  unDelete() {
    this.deleteToggle = false;
  }

  deleteThis(id) {
    for (let i = 0; i < this.chatList.length; i++) {
      if (this.chatList[i].id == id) {
        this.chatList.splice(i, 1);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {chatName: this.chatName, chatMembers: this.chatMembers}
    });

    dialogRef.afterClosed().subscribe( result =>{
        if(result != undefined){
            this.chatName = result;
            // this.chatList.push({name: this.chatName, id: this.id});
            this.ab.newConversation(this.chatName, this.chatMembers);
            // this.addTarget(this.chatMembers);
        }
      }
    );

  }

  // private addTarget(target) {
  //
  //     this.afs.collection('users').get().subscribe( (doc) => {
  //
  //         console.log('lookin');
  //
  //         for(let i = 0; i < target.length; i++) {
  //             doc.forEach(document => {
  //
  //                 let ref = document.data();
  //
  //                 if (target[i] === ref.uid) {
  //                     ref.conversationIds.push(this.ab.createdId);
  //                     console.log(this.ab.createdId);
  //                 }
  //             });
  //         }
  //     })
  // }
}
