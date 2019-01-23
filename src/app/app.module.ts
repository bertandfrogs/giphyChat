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
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
