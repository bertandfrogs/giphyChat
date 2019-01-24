import { Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/auth";
import {auth} from "firebase";
import { CurrentUserData} from "../current-user-data";


@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  userName;
  constructor(public afAuth: AngularFireAuth) { }

  logIn () {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());


  }

  logOut () {
    return this.afAuth.auth.signOut()
  }


}
