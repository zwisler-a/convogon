import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ROUTES} from '../../app.routes';
import {AppService} from '../../../api';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  private appService: AppService = inject(AppService);
  version$ = this.appService.getVersion();
  protected readonly ROUTES = ROUTES;
}
