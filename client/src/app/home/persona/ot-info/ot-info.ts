import {Component, Inject, Input} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperNext} from '@angular/material/stepper';

@Component({
  selector: 'app-ot-info',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    MatSlideToggle,
    MatButtonModule,
    MatStepperNext
  ],
  templateUrl: './ot-info.html',
  styleUrl: './ot-info.css'
})
export class OtInfo {

  @Input()
  form!: FormGroup;

  constructor(private fb: FormBuilder) {

  }
}
