import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[toggle]',
})
export class ToggleDirective {

  private _shown = false;

  constructor(
    private el: ElementRef
    ) {

      const parent = this.el.nativeElement.parentNode;
      const span = document.createElement('span');

       span.innerHTML = ' <button class="btn btn-primary btn-sm toggleShow">show</button>';
      //span.innerHTML = ' <i class="bi bi-eye-slash">o</i>';

      span.addEventListener('click', () => {
        this.toggle(span);
      });

      parent.appendChild(span);
  }

  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      /* <button mat-icon-button color="primary" aria-label="Example icon button with a home icon">
        <mat-icon>home</mat-icon>
      </button> */
      span.innerHTML = ' <button class="btn btn-primary btn-sm toggleShow">hide</button>';

    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = ' <button class="btn btn-primary btn-sm toggleShow">show</button>';
    }
  }
}