import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthLoginComponent} from './auth-login/auth-login.component';
import {GiphyTitlesComponent} from './giphy-titles/giphy-titles.component';

const routes: Routes = [
    {
      path: 'login',
      component: AuthLoginComponent
    },
    {
      path: 'titles',
      component: GiphyTitlesComponent
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
