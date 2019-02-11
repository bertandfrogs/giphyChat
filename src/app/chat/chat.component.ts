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
  currentUser : string;
  currentHex : string;
  userArray = [];
  displayNameArray = [];
  userHex = [];

  current = new Conversation(

      [],

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
              this.userArray = [];
              this.displayNameArray = []
              this.current.deliverto = [];
              this.userHex = [];
              this.currentUser = this.db.currentUser;
              this.currentHex = this.db.currentUserHex;
              console.log(this.currentHex)
              this.updateData()
              this.db.updateLocalConversation()
              this.currentUsers()
          });
      }
  }

  submit(){

      this.searchterm = this.input;
      this.giphyservice.getInfo(this.searchterm).subscribe((info) =>{


          this.info = info;
          this.current.conversationdata.push({
              url: this.info.data[Math.floor(Math.random() * (5 - 1 + 1)) + 1].images.downsized.url,
              toOrfrom:this.currentUser,
              date:(new Date()).toDateString(),
              hex:this.currentHex
          });

          this.db.addChat({
              url: this.info.data[Math.floor(Math.random() * (5 - 1 + 1)) + 1].images.downsized.url,
              toOrfrom:this.currentUser,
              date:(new Date()).toString(),
              hex:this.currentHex
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

  currentUsers(){


      this.afs.collection('conversations').doc(this.db.currentChatKey).get().subscribe( (doc) => {

          this.userArray = doc.data().conversation.users;
          let admin = doc.data().conversation.admin;

          console.log(this.userArray);

          console.log(this.db.findUserFromUserID(this.userArray[0]))

               for (let i = 0; i < this.userArray.length; i++){
                    console.log('lookin')

                    this.db.findUserFromUserID(this.userArray[i]).subscribe( (doc) => {

                        doc.forEach(document => {

                            let ref = document.data();

                                if(this.userArray[i] === ref.uid){
                                    console.log(ref.displayName)
                                    this.displayNameArray.push(ref.displayName);
                                    this.userHex.push(ref.hex);
                                    console.log(this.displayNameArray)
                                }
                                if(admin === ref.displayName){
                                    this.displayNameArray.push(admin)
                                    this.userHex.push(ref.hex);
                                }

                        })

                        this.current.deliverto = this.displayNameArray
                        console.log(this.displayNameArray);

                    });
               }



      })

  }



}

