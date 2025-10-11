import {Component, Input} from '@angular/core';
import {DatePipe, KeyValuePipe} from "@angular/common";
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-persona-overview',
  imports: [
    DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './persona-overview.html',
  styleUrl: './persona-overview.css'
})
export class PersonaOverview {
  @Input() persona: any;
}
