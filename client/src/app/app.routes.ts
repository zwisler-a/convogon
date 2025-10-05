import {Routes} from '@angular/router';
import {Login} from './auth/login/login';
import {AuthGuard} from './auth/auth.guard';
import {HomeShell} from './home/home-shell/home-shell';
import {Overview} from './home/overview/overview';
import {Persona} from './home/persona/persona';
import {PersonaDetails} from './home/persona-details/persona-details';

export const routes: Routes = [
  {path: 'login', component: Login},
  {
    path: '', component: HomeShell, children: [
      {path: 'overview', component: Overview},
      {path: 'add', component: Persona},
      {path: 'persona/:id', component: PersonaDetails},
      {path: '**', redirectTo: 'overview'},
    ], canActivate: [AuthGuard],
  }
];
