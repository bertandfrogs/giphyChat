import { Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/auth";
import {auth} from "firebase";
import { CurrentUserData} from "../current-user-data";
import {AngularFireService} from '../angular-fire.service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  userName;
  constructor(public afAuth: AngularFireAuth,
              private db: AngularFireService,
              private router: Router
              ) { }


  logIn () {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
        user => {

          this.router.navigate(['/list'])
        }
    );
  }

  logOut () {
    return this.afAuth.auth.signOut()
  }


}
