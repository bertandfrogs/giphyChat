import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { GiphyTitlesComponent } from './giphy-titles/giphy-titles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule
} from '@angular/material';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';

import	{	environment	}	from	'../environments/environment';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AngularFireDatabaseModule} from '@angular/fire/database';

const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    GiphyTitlesComponent,
    ChatComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
      AngularFireDatabaseModule,
      FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
