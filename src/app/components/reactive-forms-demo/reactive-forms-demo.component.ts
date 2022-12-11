import { Observable } from 'rxjs';
import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ValidatePassword } from "../../must-match/validate-password";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'reactive-form',
  templateUrl: './reactive-forms-demo.component.html',
  styleUrls: ['./reactive-forms-demo.component.css']
})

export class ReactiveFormsDemoComponent implements OnInit {

  loginForm: UntypedFormGroup;

  submitted = false;

  // City names
  City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']

  user: Observable<any>;
  type: string;

  email = 'pwelby@gmail.com';
  website = 'https://www.i-am-paulwelby.com';
  phone = '619-629-3770';

  showMore: boolean = false;

  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    public router: Router,
    public fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit(): void {

    this.initForm();

    this.afAuth.authState.subscribe(user => {
        console.log('Dashboard: user', user);

        if (user) {
            let emailLower = user.email.toLowerCase();
            this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
        }
    });
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
        password: ['', Validators.required]
    });
  }

  isValidInput(fieldName: any | number): boolean {
    return this.loginForm.controls[fieldName]
    .invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  formObj:[];

  login() {
    console.log('Email: ', this.loginForm.value.email);
    console.log('Password: ', this.loginForm.value.password);

    //alert(this.loginForm.value.email);
    alert('Form submitted');

  // Inside the login() function, you can either write the direct network request code using
  // <a href="https://appdividend.com/2019/06/06/angular-8-httpclient-example-how-to-send-ajax-request-in-angular/">Angular httpclient</a>
  // or use <a href="https://appdividend.com/2018/01/20/angular-services-tutorial-example-scratch/">Angular service</a> and call that service’s
  // function here and pass the form values as function parameters.

  }

  showResult(){
    this.showMore = true;
  }

  hideResult() {
    this.showMore = false;
  }

  logout(): void {
    this.afAuth.signOut();
    window.location.reload();
  }

}
