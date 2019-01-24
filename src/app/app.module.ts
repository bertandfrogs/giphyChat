import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { GiphyTitlesComponent } from './giphy-titles/giphy-titles.component';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule,
         MatButtonModule } from "@angular/material";

import	{	environment	}	from	'../environments/environment';

import {APIKeys} from "./api-keys";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {FormsModule} from "@angular/forms";
import {
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const firebaseConfig = APIKeys.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    GiphyTitlesComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    BrowserAnimationsModule

  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
