import {Component, Input} from '@angular/core';
import {BehaviorSubject, map, Observable, startWith, Subject} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading',
  imports: [
    AsyncPipe,
    MatProgressBar
  ],
  templateUrl: './loading.html',
  styleUrl: './loading.css'
})
export class Loading {

  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loading$: Observable<boolean> = this.loadingSubject.pipe();

  @Input()
  set loading(value: boolean | Observable<any>) {
    if (value instanceof Observable) {
      this.loading$ = value.pipe(
        map(() => false),
        startWith(true)
      );
    } else {
      this.loadingSubject.next(value);
      this.loading$ = this.loadingSubject.pipe()
    }
  }
}
