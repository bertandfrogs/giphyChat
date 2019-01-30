import {Component, NgZone, OnInit} from '@angular/core';
import {AuthLoginService} from "./auth-login.service";
import {CurrentUserData} from "../current-user-data";
import {Router} from "@angular/router";
import {AngularFireService} from '../angular-fire.service';
import {AngularFireAuth} from "@angular/fire/auth";


@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {


  x = new CurrentUserData('', {});
  person;

  constructor(private db: AuthLoginService,
              private zone: NgZone,
              private router: Router,
              private ab: AngularFireService,
              private afAuth: AngularFireAuth) { }

  ngOnInit() {

  }

  logIn () {
    this.db.logIn().then( data => {
      this.zone.run(()=>{
        this.person = this.afAuth.auth.currentUser;
        console.log(this.person);
        this.router.navigate(['/list']);
        this.db.userName = this.person;
        this.x.id = this.person.displayName;
        console.log(this.x.id);
        this.ab.getUser(this.x.id);
          this.ab.getPastChats();

      });
    });
  }


}
