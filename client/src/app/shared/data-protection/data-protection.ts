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
  selector: 'app-data-protection',
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
  templateUrl: './data-protection.html',
  styleUrl: './data-protection.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataProtection {
  protected readonly ROUTES = ROUTES;

  navigateBack() {
    window.history.back();
  }
}
