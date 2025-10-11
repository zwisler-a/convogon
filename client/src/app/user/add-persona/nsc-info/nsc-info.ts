import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';

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
    ReactiveFormsModule,
    MatCardActions,
    MatStepperPrevious
  ],
  templateUrl: './nsc-info.html',
  styleUrl: './nsc-info.css'
})
export class NscInfo {
  @Input() form!: FormGroup;

}
