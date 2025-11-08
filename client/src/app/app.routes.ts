import {Routes} from '@angular/router';
import {Login} from './auth/login/login';
import {AuthGuard} from './auth/auth.guard';
import {Shell} from './core/shell/shell';
import {Home} from './user/home/home';
import {Persona} from './user/add-persona/persona';
import {PersonaView} from './user/persona-view/persona-view';
import {LoginSend} from './auth/login-send/login-send';
import {Pay} from './user/pay/pay';
import {Faq} from './user/faq/faq';
import {EditPersona} from './user/edit-persona/edit-persona';
import {DataProtection} from './shared/data-protection/data-protection';
import {CodeOfConduct} from './shared/code-of-conduct/code-of-conduct';
import {Register} from './auth/register/register';

export const ROUTES = {
  LOGIN: 'login',
  REGISTER: 'register',
  LOGIN_SEND: 'login-send',
  HOME: 'home',
  ADD_PERSONA: 'add',
  VIEW_PERSONA: 'persona/:id',
  EDIT_PERSONA: 'edit/persona/:id',
  PAY: 'pay',
  FAQ: 'faq',
  DATA: 'data-protection',
  CONDUCT: 'code-of-conduct',
  ADMIN: 'admin',
  ADMIN_VIEW_PERSONA: 'admin/persona/:id',
  ADMIN_VIEW_PERSONAS: 'admin/personas',
  ADMIN_VIEW_USERS: 'admin/accounts',
  ADMIN_VIEW_USER: 'admin/account/:id',
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
      {path: ROUTES.ADD_PERSONA, component: Persona},
      {path: ROUTES.VIEW_PERSONA, component: PersonaView},
      {path: ROUTES.EDIT_PERSONA, component: EditPersona},
      {path: ROUTES.PAY, component: Pay},
      {path: ROUTES.FAQ, component: Faq},
      {path: ROUTES.ADMIN, loadComponent: () => import(/* webpackChunkName: "admin" */ './admin/admin').then(m => m.Admin)},
      {path: ROUTES.ADMIN_VIEW_PERSONAS, loadComponent: () => import(/* webpackChunkName: "admin" */ './admin/personas-view/personas-view').then(m => m.PersonasView)},
      {path: ROUTES.ADMIN_VIEW_PERSONA, loadComponent: () => import(/* webpackChunkName: "admin" */ './admin/persona-details/persona-details').then(m => m.PersonaDetails)},
      {path: ROUTES.ADMIN_VIEW_USERS, loadComponent: () => import(/* webpackChunkName: "admin" */ './admin/accounts-view/accounts-view').then(m => m.AccountsView)},
      {path: ROUTES.ADMIN_VIEW_USER, loadComponent: () => import(/* webpackChunkName: "admin" */ './admin/account-view/account-view').then(m => m.AccountView)},
      {path: '**', redirectTo: ROUTES.HOME},
    ], canActivate: [AuthGuard],
  }
];
