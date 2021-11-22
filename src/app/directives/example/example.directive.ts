import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appExample]'
})
export class ExampleDirective {

  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer2
    ) {

      // With this directive we can manipulate the element we are referencing whenever the 'selector' is
      // placed in the element object

      elementRef.nativeElement.style.backgroundColor = '#f6f799';

      // This 'renderer' is used if we need to be using Node.js as Node cannot access the DOM directly.
      // We Then need to use an abstraction-layer on the DOM which is utilized by the so-called Renderer2

      //renderer.setStyle(elementRef.nativeElement, 'backgroundColor', 'purple');

      this.setBgColor('white');
    }

    setBgColor(color: string) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'backgroundColor',
        color
      )
    }

    @HostListener('mouseenter') onMouseEnter() {
      this.setBgColor('yellow')
    }

    @HostListener('click') onMouseClick() {
      this.setBgColor('green')
    }

    @HostListener('mouseleave') onMouseLeave() {
      this.setBgColor('#f6f799')
    }
}
