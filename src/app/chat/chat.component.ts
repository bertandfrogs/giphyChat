import { Component, OnInit } from '@angular/core';
import { GiphyapiService } from '../giphyapi.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  info;
  searchterm = "crepe";

  constructor(private giphyservice: GiphyapiService) { }

  ngOnInit() {
      this.giphyservice.getInfo(this.searchterm).subscribe((info) =>{
          this.info = info;
          console.log(info);

      })
  }

}
