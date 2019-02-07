import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogData} from "./dialogData";
import {AngularFireService} from "../../angular-fire.service";
import {selectValueAccessor} from "../../../../node_modules/@angular/forms/src/directives/shared";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent{
  public canceled = false;
  constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      public afs: AngularFireService,
      @Inject(MAT_DIALOG_DATA) public data: DialogData){}

  uList = this.afs.userList;

  userId: string;
  temp: string;
  selectedUserId: string;
  counter = 1;

  onNoClick(): void{
    this.dialogRef.close();
    this.canceled = true;
  }

  getMember(data) {
    this.temp = this.userId;
    this.userId = data;

    if(this.temp == undefined){
      this.selectedUserId = this.userId;
    }
    else{
      this.selectedUserId = this.temp;
    }

    console.log("-----------------------");
    console.log(this.counter++);
    console.log("temp: " + this.temp);
    console.log("userId: " + this.userId);

    console.log("final userId: " + this.selectedUserId);

  }
}
