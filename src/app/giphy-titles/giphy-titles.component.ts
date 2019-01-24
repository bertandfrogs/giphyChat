import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
  }

  addChat(){
    this.unDelete();
    this.chatList.push({name: "Chat Name", id: this.id});
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
}
