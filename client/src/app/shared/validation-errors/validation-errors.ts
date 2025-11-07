import {Component, Input, Optional, SkipSelf} from '@angular/core';
import {AbstractControl, ControlContainer} from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  standalone: true,
  imports: [],
  templateUrl: './validation-errors.html',
  styleUrl: './validation-errors.css'
})
export class ValidationErrors {
  @Input({ required: true }) controlName!: string;

  constructor(@Optional() @SkipSelf() private controlContainer: ControlContainer) {}

  get control(): AbstractControl | null {
    return (this.controlContainer?.control as any)?.get(this.controlName) ?? null;
  }
}
