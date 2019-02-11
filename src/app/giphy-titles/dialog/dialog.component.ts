import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogData} from "./dialogData";
import {AngularFireService} from "../../angular-fire.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit{
  public canceled = false;
  constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      public afs: AngularFireService,
      @Inject(MAT_DIALOG_DATA) public data: DialogData){}

  ngOnInit(){
    console.log(this.data);
  }

  uList = this.afs.userList;

  userId: string;

  onNoClick(): void{
    this.dialogRef.close();
    this.canceled = true;
  }

  getMember(user) {
    console.log(user);
    let duplicateUser = false;
    this.userId = user.source.value;

    if(user.isUserInput == true){
        for(let i = 0; i < this.data.chatMembers.length; i++){
          console.log(this.data.chatMembers[i]);
        if(this.data.chatMembers[i] == this.userId){
          duplicateUser = true;
          console.log("duplicate user found");
        }
      }
      if(duplicateUser != true){
          this.data.chatMembers.push(this.userId);
          console.log("new user found");
      }
    }
  }
}
