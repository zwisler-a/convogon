import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatCard, MatCardContent} from '@angular/material/card';
import {ROUTES} from '../../app.routes';

@Component({
  selector: 'app-faq',
  imports: [RouterLink, MatIconModule, MatButton, MatCard, MatCardContent],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  protected readonly ROUTES = ROUTES;
}
