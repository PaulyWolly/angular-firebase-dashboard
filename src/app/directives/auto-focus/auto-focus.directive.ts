import {AfterContentInit, Directive, ElementRef, Input} from '@angular/core'

@Directive({
	selector:"[autofocus]"
})
export class AutoFocus implements AfterContentInit {

  @Input() public appAutoFocus: boolean;
	constructor(
		private elementRef: ElementRef
	){}

	/* ngAfterViewInit(){
		this.elementRef.nativeElement.focus();
	} */

  public ngAfterContentInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 500);
  }
}
