import {Routes} from '@angular/router';
import {Login} from './auth/login/login';
import {AuthGuard} from './auth/auth.guard';
import {Shell} from './shell/shell';
import {Home} from './user/home/home';
import {Persona} from './user/add-persona/persona';
import {PersonaDetails} from './user/persona-details/persona-details';
import {Admin} from './admin/admin';
import {LoginSend} from './auth/login-send/login-send';
import {AdminPersonaDetails} from './admin/admin-persona-details/admin-persona-details';

export const ROUTES = {
  LOGIN: 'login',
  LOGIN_SEND: 'login-send',
  HOME: 'home',
  ADMIN_PERSONA_VIEWS: 'admin/persona/:id',
}

export const routes: Routes = [
  {path: ROUTES.LOGIN, component: Login},
  {path: ROUTES.LOGIN_SEND, component: LoginSend},
  {
    path: '', component: Shell, children: [
      {path: ROUTES.HOME, component: Home},
      {path: 'add', component: Persona},
      {path: 'persona/:id', component: PersonaDetails},
      {path: 'admin', component: Admin},
      {path: ROUTES.ADMIN_PERSONA_VIEWS, component: AdminPersonaDetails},
      {path: '**', redirectTo: 'home'},
    ], canActivate: [AuthGuard],
  }
];
