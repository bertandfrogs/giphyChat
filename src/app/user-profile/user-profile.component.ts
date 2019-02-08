import { Component, OnInit } from '@angular/core';
import {AuthLoginService} from "../auth-login/auth-login.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {AngularFireService} from "../angular-fire.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  person;
  constructor(private db: AuthLoginService,
              private afAuth: AngularFireAuth,
              private router: Router,
              private afs: AngularFireService) {}

  ngOnInit() {
    if(!this.afAuth.auth.currentUser){
        this.router.navigate(['/login']);
    }
    else{
      this.person = this.afAuth.auth.currentUser;
      console.log(this.person);
    }

  }

  logOut () {
    this.db.logOut().then( ()=> {window.location.reload()});
  }
}
