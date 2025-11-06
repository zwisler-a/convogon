import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {ROUTES} from '../../app.routes';
import {ObfuscatedMail} from '../obfuscated-mail';

@Component({
  selector: 'app-code-of-conduct',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    ObfuscatedMail,
  ],
  templateUrl: './code-of-conduct.html',
  styleUrl: './code-of-conduct.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeOfConduct {
  protected readonly ROUTES = ROUTES;

  navigateBack() {
    window.history.back();
  }
}
