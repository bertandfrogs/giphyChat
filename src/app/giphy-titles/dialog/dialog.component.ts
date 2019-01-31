import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogData} from "./dialogData";
import {AngularFireService} from "../../angular-fire.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent{


  constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      public afs: AngularFireService,
      @Inject(MAT_DIALOG_DATA) public data: DialogData){}


  public uList = this.afs.userList;


  onNoClick(): void{
    this.dialogRef.close();
  }
}
