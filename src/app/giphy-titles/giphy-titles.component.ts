import { Component } from '@angular/core';
import {MatDialog} from "@angular/material";
import {DialogComponent} from "./dialog/dialog.component";

@Component({
  selector: 'app-giphy-titles',
  templateUrl: './giphy-titles.component.html',
  styleUrls: ['./giphy-titles.component.css']
})

export class GiphyTitlesComponent implements OnInit {
  chatList = [];
  noContentInList = true;
  deleteToggle = false;
  id=0;

  constructor() { }

  chatName: string;
  chatMembers: string[];
  constructor(public dialog: MatDialog) { }

  addChat(){
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
        console.log("dialog closed");
        console.log(result);
        this.chatName = result;
        this.chatList.push({name: this.chatName, id: this.id});
      }
    );

  }

  goToChat(id: number) {

  }
}
