import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-giphy-titles',
  templateUrl: './giphy-titles.component.html',
  styleUrls: ['./giphy-titles.component.css']
})
export class GiphyTitlesComponent implements OnInit {
  chatList = [];
  noContentInList = true;
  constructor() { }

  ngOnInit() {
  }

  addChat(){
    this.chatList.push({name: "Chat Name"});
    this.noContentInList = false;
  }

  deleteChat() {
      console.log("delete chat");
  }
}
