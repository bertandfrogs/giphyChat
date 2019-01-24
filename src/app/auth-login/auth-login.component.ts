import {Component, NgZone, OnInit} from '@angular/core';
import {AuthLoginService} from "./auth-login.service";
import {CurrentUserData} from "../current-user-data";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  x = new CurrentUserData("", {});
  userId;
  constructor(private db: AuthLoginService,
              private zone: NgZone) { }

  ngOnInit() {

  }

  logIn () {
    this.db.logIn().then( data => {
      this.zone.run(()=>{
        this.userId= data.user.email;
        console.log(this.userId);
      });
    } );
  }

}
