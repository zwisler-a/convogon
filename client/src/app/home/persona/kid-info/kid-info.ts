import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatStepperNext} from '@angular/material/stepper';

@Component({
  selector: 'app-kid-info',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatInputModule,
    MatInput,
    MatLabel,
    MatStepperNext,
    ReactiveFormsModule
  ],
  templateUrl: './kid-info.html',
  styleUrl: './kid-info.css'
})
export class KidInfo {
  @Input() form!: FormGroup;

}
