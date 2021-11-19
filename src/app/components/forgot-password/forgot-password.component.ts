import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    mailSent: boolean;
    isProgressVisible: boolean;
    forgotPasswordForm: FormGroup;
    firebaseErrorMessage: string;

    user: Observable<any>;

    constructor(
      private authService: AuthService,
      private router: Router,
      public afAuth: AngularFireAuth,
      public firestore: AngularFirestore
      ) {
        this.mailSent = false;
        this.isProgressVisible = false;

        this.forgotPasswordForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email])
        });

        this.firebaseErrorMessage = '';
    }

    ngOnInit(): void {
        this.afAuth.authState.subscribe(user => {
          // if the user is logged in, update the form value with their email address
            if (user) {
                this.forgotPasswordForm.patchValue({
                    email: user.email
                });
            }
        });

        this.afAuth.authState.subscribe(user => {
            console.log('Dashboard: user', user);

            if (user) {
                let emailLower = user.email.toLowerCase();
                this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
            }
        });
    }

    retrievePassword() {
        this.isProgressVisible = true;
        // show the progress indicator as we start the Firebase password reset process

        if (this.forgotPasswordForm.invalid)
            return;

        this.authService.resetPassword(this.forgotPasswordForm.value.email).then((result) => {
            this.isProgressVisible = false;
            // no matter what, when the auth service returns, we hide the progress indicator
            if (result == null) {
              // null is success, false means there was an error
                console.log('password reset email sent...');
                this.mailSent = true;
                // this.router.navigate(['/dashboard']);
                // when the user is logged in, navigate them to dashboard
            }
            else if (result.isValid == false) {
                console.log('login error', result);
                this.firebaseErrorMessage = result.message;
            }
        });
    }

}
