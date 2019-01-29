import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'giphyChat';
  users: Observable<any[]>;
   constructor (db: AngularFireDatabase) {
       this.users = db.list('users').valueChanges()
   }
}
