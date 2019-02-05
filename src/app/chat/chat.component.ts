import { Component, OnInit } from '@angular/core';
import { GiphyapiService } from '../giphyapi.service'
import { Conversation} from "../conversation";
import { DatePipe} from "@angular/common";
import {AngularFireService} from "../angular-fire.service";
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import {Router} from "@angular/router";
import { AngularFireAuth} from "@angular/fire/auth";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  info;
  searchterm = "";
  input = "";
  conversation;
  test;

  current = new Conversation(

      "unknown",

      []

  );

  constructor(private giphyservice: GiphyapiService,
                private db: AngularFireService,
                private afs: AngularFirestore,
                private afAuth: AngularFireAuth, 
                private router: Router) {}

  ngOnInit(){

      if(!this.afAuth.auth.currentUser){
          this.router.navigate(['/login']);
          console.log(this.afAuth.auth.currentUser);
      }
      else{
          this.giphyservice.getInfo(this.searchterm).subscribe((info) =>{
              this.info = info;
              this.updateData()
              this.db.updateLocalConversation()
          });
      }
  }

  submit(){

      this.searchterm = this.input;
      this.giphyservice.getInfo(this.searchterm).subscribe((info) =>{


          this.info = info;
          this.current.conversationdata.push({
              url: this.info.data[Math.floor(Math.random() * (5 - 1 + 1)) + 1].images.downsized.url,
              toOrfrom:"to",
              date:(new Date()).toDateString()
          });

          this.db.addChat({
              url: this.info.data[Math.floor(Math.random() * (5 - 1 + 1)) + 1].images.downsized.url,
              toOrfrom:"to",
              date:(new Date()).toString(),
          });

          this.updateData();
          this.input = "";

      });



  }

  updateData(){
      this.afs.collection('conversations').doc(this.db.currentChatKey).get().subscribe((doc) => {
          this.test = doc.data().conversation.messages;
          this.current.conversationdata = this.test;
      });
  }

}

