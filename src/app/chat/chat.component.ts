import { Component, OnInit } from '@angular/core';
import { GiphyapiService } from '../giphyapi.service'
import { Conversation} from "../conversation";
import { DatePipe} from "@angular/common";
import {AngularFireService} from "../angular-fire.service";
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'

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

  current = new Conversation(

      "unknown",

      []

  )

  constructor(private giphyservice: GiphyapiService,
                private db: AngularFireService,
                private afs: AngularFirestore) {

  }

  ngOnInit() {

      this.giphyservice.getInfo(this.searchterm).subscribe((info) =>{
          this.info = info;
          console.log(info);

      })
      console.log(this.current.conversationdata);

      this.afs.collection('conversations').doc(this.db.getCurrentUserID()).ref.get().then(function(doc) {
          this.conversation = doc.data();
      });

  }


  submit(){

      console.log('form submitted');
      console.log(this.input);

      this.searchterm = this.input;

      this.giphyservice.getInfo(this.searchterm).subscribe((info) =>{
          this.info = info;
          this.current.conversationdata.push({
              url: this.info.data[Math.floor(Math.random() * (5 - 1 + 1)) + 1].images.downsized.url,
              toOrfrom:"to",
              date:new Date()
          })

      })


      console.log(this.current)
      this.db.addChats(this.current)




  }

}
