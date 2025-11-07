import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatDatepickerInput, MatDatepickerModule} from '@angular/material/datepicker';
import {ValidationErrors} from '../../../shared/validation-errors/validation-errors';
import {ControlsOf, KidInfoForm} from '../persona-forms.types';

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
    ReactiveFormsModule,
    MatCardActions,
    MatDatepickerModule,
    ValidationErrors
  ],
  templateUrl: './kid-info.html',
  styleUrl: './kid-info.css'
})
export class KidInfo {
  @Input() form!: FormGroup<ControlsOf<KidInfoForm>>;

}
