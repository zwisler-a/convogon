import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-site-header',
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css'
})
export class SiteHeader {

}
