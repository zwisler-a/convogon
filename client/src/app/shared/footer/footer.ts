import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ROUTES} from '../../app.routes';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  protected readonly ROUTES = ROUTES;
}
