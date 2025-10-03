import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-overview',
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './overview.html',
  styleUrl: './overview.css'
})
export class Overview {

}
