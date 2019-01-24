import { Component, OnInit } from '@angular/core';
import { GiphyapiService } from '../giphyapi.service'
import { Conversation} from "../conversation";
import { DatePipe} from "@angular/common";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  info;
  searchterm = "crepe";
  input = "";

  current = new Conversation(

      "unknown",

      []

  )

  constructor(private giphyservice: GiphyapiService) { }

  ngOnInit() {
      this.giphyservice.getInfo(this.searchterm).subscribe((info) =>{
          this.info = info;
          console.log(info);

      })
      console.log(this.current.conversationdata)
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

  }

}
