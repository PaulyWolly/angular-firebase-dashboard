import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class AppHighlightDirective {

  constructor(
    private eleRef: ElementRef
  ) {
    eleRef.nativeElement.style.background = 'red';
  }

}
