import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatStepperNext} from '@angular/material/stepper';

@Component({
  selector: 'app-nsc-info',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatInput,
    MatInputModule,
    MatLabel,
    MatStepperNext,
    ReactiveFormsModule
  ],
  templateUrl: './nsc-info.html',
  styleUrl: './nsc-info.css'
})
export class NscInfo {
  @Input() form!: FormGroup;

}
