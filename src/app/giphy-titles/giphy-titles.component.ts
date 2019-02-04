import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {DialogComponent} from "./dialog/dialog.component";
import {AngularFireService} from "../angular-fire.service";
import { AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import { AngularFirestore } from 'angularfire2/firestore'



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
  chatMembers: string[];
  list: string[];
  conversation: string[];

  constructor(public dialog: MatDialog,
              public fireService: AngularFireService,
              private afAuth: AngularFireAuth,
              private router: Router,
              private ab: AngularFireService,
              private afs: AngularFirestore,
  ) {
  }

  ngOnInit() {
    if (!this.afAuth.auth.currentUser) {
      this.router.navigate(['/login']);
      console.log(this.afAuth.auth.currentUser);
    }
    else{
        this.ab.getUserList();
        this.ab.getPastChats();
    }
  }

  addChat() {
    this.unDelete();
    this.openDialog();
    this.noContentInList = false;
    this.id++;
  }

  deleteChat() {
      this.deleteToggle = true;
  }

  unDelete() {
      this.deleteToggle = false;
  }

  deleteThis(id) {
    for(let i = 0; i < this.chatList.length; i++){
      if(this.chatList[i].id == id){
        this.chatList.splice(i, 1);
      }
    }
    if(this.chatList[0] === null){
        this.noContentInList = true;
    }
  }
  
  openDialog(): void{
    const dialogRef = this.dialog.open(DialogComponent,{
      width: '250px',
      data: {chatName: this.chatName, chatMembers: this.chatMembers}
    });

    dialogRef.afterClosed().subscribe( result =>{
        console.log(result);
        if(result != undefined){
            this.chatName = result;
            this.chatList.push({name: this.chatName, id: this.id});
            this.ab.newConversation(this.chatName)
        }
      }
    );
  }

  goToChat(id: number) {

  }
}

