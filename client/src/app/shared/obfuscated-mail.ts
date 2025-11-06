import {AfterViewInit, Directive, ElementRef, Input, OnDestroy} from '@angular/core';

@Directive({
  selector: '[appObfuscatedMail]'
})
export class ObfuscatedMail implements AfterViewInit, OnDestroy {

  @Input('appObfuscatedMail') mail!: string;

  constructor(private el: ElementRef) {

  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {
    this.el.nativeElement.addEventListener('mouseenter', () => {
      this.el.nativeElement.setAttribute('href', 'mailto:' + this.decodeEmail());
    });
    this.el.nativeElement.addEventListener('mouseleave', () => {
      this.el.nativeElement.setAttribute('href', 'mailto:');
    });
    this.el.nativeElement.innerText = this.decodeEmail();
    this.el.nativeElement.setAttribute('href', 'mailto:');
  }

  private decodeEmail() {
    if (!this.mail) return;
    const encodedString = this.mail;
    let email = "";
    const keyInHex = encodedString.substr(0, 2);
    const key = parseInt(keyInHex, 16);
    for (let n = 2; n < encodedString.length; n += 2) {
      const charInHex = encodedString.substr(n, 2)
      const char = parseInt(charInHex, 16);
      const output = char ^ key;
      email += String.fromCharCode(output);
    }
    return email;
  }

}
