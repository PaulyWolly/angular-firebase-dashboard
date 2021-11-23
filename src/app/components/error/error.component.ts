import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
    selector: 'error-component',
    templateUrl: 'error.component.html',
    styleUrls: ['error.component.scss']
})

export class ErrorComponent {

    errorMsgList: any = [];

    @Input() controlName: AbstractControl | AbstractControlDirective

    errorMessage = {
        'required'  : (params)  => `This field is required`,
        'maxlength' : (params)  => `Maximum ${params.requiredLength} characters are allowed`,
        'minlength' : (params)  => `Minimum ${params.requiredLength} characters are required`,
        'pattern'   : (params)  => `Invalid format`,
        'min'       : (params)  => `Minimum amount should be ₹ ${params.min}`,
        'whitespace': (params)   => `White spaces are not allowed`
    };


    listErrors() {
        if (!this.controlName) return [];
        if (this.controlName.errors) {
            this.errorMsgList = [];
            Object.keys(this.controlName.errors).map( error => {
                this.controlName.touched || this.controlName.dirty ?
                this.errorMsgList.push(this.errorMessage[error](this.controlName.errors[error])) : '';
            });
            return this.errorMsgList;
        }
        else {
            return [];
        }
    }
}
