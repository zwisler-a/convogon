import {Component, Inject, Input} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperNext} from '@angular/material/stepper';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-it-info',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    MatCheckbox,
    MatButtonModule,
    MatStepperNext
  ],
  templateUrl: './it-info.html',
  styleUrl: './it-info.css'
})
export class ItInfo {

  @Input()
  form!: FormGroup;

  constructor(private fb: FormBuilder) {

  }
}
