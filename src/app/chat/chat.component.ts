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
  message = {};
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
              console.log(info);
              this.updateData()
              this.db.updateLocalConversation()
              console.log(this.current.conversationdata);
          });
      }
  }

  submit(){

      console.log('form submitted');
      console.log(this.input);
      this.searchterm = this.input;
      console.log(this.current.conversationdata);
      this.giphyservice.getInfo(this.searchterm).subscribe((info) =>{


          this.info = info;
          console.log(this.current);
          this.current.conversationdata.push({
              url: this.info.data[Math.floor(Math.random() * (5 - 1 + 1)) + 1].images.downsized.url,
              toOrfrom:"to",
              date:(new Date()).toDateString()
          });

          console.log(this.current);

          console.log(this.message);

          // this.db.newMessage(this.current);

          this.db.addChat({
              url: this.info.data[Math.floor(Math.random() * (5 - 1 + 1)) + 1].images.downsized.url,
              toOrfrom:"to",
              date:(new Date()).toString(),
          });
          this.updateData()
      });



  }

  updateData(){
      this.afs.collection('conversations').doc(this.db.currentChatKey).get().subscribe((doc) => {
            this.test = doc.data().conversation.messages
          this.current.conversationdata = this.test;
      });
  }

}

