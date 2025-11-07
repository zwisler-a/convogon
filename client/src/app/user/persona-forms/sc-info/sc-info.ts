import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {ValidationErrors} from '../../../shared/validation-errors/validation-errors';
import {ControlsOf, PlayerCharInfoForm} from '../persona-forms.types';

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
    MatStepperNext,
    ReactiveFormsModule,
    MatCardActions,
    MatStepperPrevious,
    ValidationErrors
  ],
  templateUrl: './sc-info.html',
  styleUrl: './sc-info.css'
})
export class ScInfo {
  @Input() form!: FormGroup<ControlsOf<PlayerCharInfoForm>>;

}
