import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthloginComponent } from './authlogin/authlogin.component';
import { TitlelistComponent } from './titlelist/titlelist.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthloginComponent,
    TitlelistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
