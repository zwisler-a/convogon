import {Component, inject, Inject, Input, OnChanges, signal, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {COMMA, ENTER, SEMICOLON} from '@angular/cdk/keycodes';

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
    MatStepperNext,
    MatChipsModule,
    MatIconModule,
    MatCardActions,
    MatStepperPrevious
  ],
  templateUrl: './it-info.html',
  styleUrl: './it-info.css'
})
export class ItInfo implements OnChanges {


  @Input()
  form!: FormGroup;

  readonly skills = signal<string[]>([]);


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form']) {
      const skillsVal = this.form.get('skills')?.value;
      if(!skillsVal) return;
      this.skills.set(skillsVal);
    }
  }

  removeReactiveKeyword(keyword: string) {
    this.skills.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      return [...keywords];
    });
  }

  addReactiveKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.skills.update(keywords => [...keywords, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  protected readonly COMMA = COMMA;
  protected readonly ENTER = ENTER;
  protected readonly SEMICOLON = SEMICOLON;
}
