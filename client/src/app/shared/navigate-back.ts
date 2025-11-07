import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[appNavigateBack]'
})
export class NavigateBack {
  constructor(private location: Location) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    // Prevent default for anchor tags to avoid full page reloads
    if (event && (event.target as HTMLElement)?.tagName === 'A') {
      event.preventDefault();
    }
    this.location.back();
  }
}
