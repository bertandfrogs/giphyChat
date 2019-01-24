import { Component, OnInit } from '@angular/core';
import {AuthLoginService} from "../auth-login/auth-login.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  person;
  constructor(private db: AuthLoginService,
              private afAuth: AngularFireAuth,
              private router: Router) {}

  ngOnInit() {
    this.person = this.afAuth.auth.currentUser;
    console.log(this.person);
  }

  logOut () {
    this.db.logOut().then( ()=> {this.router.navigate(['/login']);
                                           console.log('user has been logged off')})
  }
}
