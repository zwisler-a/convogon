import {Component, Inject, Input} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

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
    MatCheckbox,
    MatButtonModule,
    MatStepperNext,
    MatDatepickerModule,
    MatCardActions,
    MatSelectModule,
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
