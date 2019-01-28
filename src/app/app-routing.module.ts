import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthLoginComponent} from './auth-login/auth-login.component';
import {GiphyTitlesComponent} from './giphy-titles/giphy-titles.component';
import {ChatComponent} from './chat/chat.component';
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
    {
      path: 'login',
      component: AuthLoginComponent
    },
    {
      path: 'list',
      component: GiphyTitlesComponent
    },
    { path: 'chat',
      component: ChatComponent
    },
    { path: 'profile',
        component: UserProfileComponent
    },
    { path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
