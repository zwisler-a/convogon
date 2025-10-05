import {Routes} from '@angular/router';
import {Login} from './auth/login/login';
import {AuthGuard} from './auth/auth.guard';
import {Shell} from './shell/shell';
import {Home} from './user/home/home';
import {Persona} from './user/add-persona/persona';
import {PersonaDetails} from './user/persona-details/persona-details';
import {Admin} from './admin/admin';

export const routes: Routes = [
  {path: 'login', component: Login},
  {
    path: '', component: Shell, children: [
      {path: 'home', component: Home},
      {path: 'add', component: Persona},
      {path: 'persona/:id', component: PersonaDetails},
      {path: 'admin', component: Admin},
      {path: '**', redirectTo: 'home'},
    ], canActivate: [AuthGuard],
  }
];
