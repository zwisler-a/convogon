import {Routes} from '@angular/router';
import {Login} from './auth/login/login';
import {AuthGuard} from './auth/auth.guard';
import {Shell} from './core/shell/shell';
import {Home} from './user/home/home';
import {Persona} from './user/add-persona/persona';
import {PersonaDetails} from './user/persona-details/persona-details';
import {Admin} from './admin/admin';
import {LoginSend} from './auth/login-send/login-send';
import {AdminPersonaDetails} from './admin/admin-persona-details/admin-persona-details';
import {AccountsView} from './admin/accounts-view/accounts-view';
import {AccountView} from './admin/account-view/account-view';
import {Pay} from './user/pay/pay';
import { Faq } from './user/faq/faq';
import {EditPersona} from './user/edit-persona/edit-persona';
import {DataProtection} from './shared/data-protection/data-protection';
import {CodeOfConduct} from './shared/code-of-conduct/code-of-conduct';
import {Register} from './auth/register/register';

export const ROUTES = {
  LOGIN: 'login',
  REGISTER: 'register',
  LOGIN_SEND: 'login-send',
  HOME: 'home',
  PAY: 'pay',
  FAQ: 'faq',
  ADMIN_PERSONA_VIEWS: 'admin/persona/:id',
  ADMIN: 'admin',
  ADMIN_USERS: 'admin/users',
  DATA: 'data-protection',
  CONDUCT: 'code-of-conduct',
  ADMIN_USER: 'admin/auth/:id',
}

export const routes: Routes = [
  {path: ROUTES.LOGIN, component: Login},
  {path: ROUTES.REGISTER, component: Register},
  {path: ROUTES.LOGIN_SEND, component: LoginSend},
  {path: ROUTES.DATA, component: DataProtection},
  {path: ROUTES.CONDUCT, component: CodeOfConduct},
  {
    path: '', component: Shell, children: [
      {path: ROUTES.HOME, component: Home},
      {path: 'add', component: Persona},
      {path: 'persona/:id', component: PersonaDetails},
      {path: 'edit/persona/:id', component: EditPersona},
      {path: ROUTES.ADMIN, component: Admin},
      {path: ROUTES.PAY, component: Pay},
      {path: ROUTES.FAQ, component: Faq},
      {path: ROUTES.ADMIN_PERSONA_VIEWS, component: AdminPersonaDetails},
      {path: ROUTES.ADMIN_USERS, component: AccountsView},
      {path: ROUTES.ADMIN_USER, component: AccountView},
      {path: '**', redirectTo: 'home'},
    ], canActivate: [AuthGuard],
  }
];
