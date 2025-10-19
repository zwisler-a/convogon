import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-faq',
  imports: [RouterLink, MatIconModule, MatButton],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {}
