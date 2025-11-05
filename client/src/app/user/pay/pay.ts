import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTES } from '../../app.routes';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pay',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './pay.html',
  styleUrl: './pay.css',
})
export class Pay {
  protected readonly ROUTES = ROUTES;
}
