import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatStepperNext} from '@angular/material/stepper';

@Component({
  selector: 'app-sc-info',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatInputModule,
    MatInput,
    MatLabel,
    MatSlideToggle,
    MatStepperNext,
    ReactiveFormsModule
  ],
  templateUrl: './sc-info.html',
  styleUrl: './sc-info.css'
})
export class ScInfo {
  @Input() form!: FormGroup;

}
