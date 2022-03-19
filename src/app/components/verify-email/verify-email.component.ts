import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { VirtualTimeScheduler, Observable } from 'rxjs';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

    email: string;
    mailSent: boolean;
    isProgressVisible: boolean;
    firebaseErrorMessage: string;
    showMore: boolean = false;

    user: Observable<any>;

    constructor(
      private authService: AuthService,
      private router: Router,
      public afAuth: AngularFireAuth,
      public firestore: AngularFirestore
      ) {
        this.email = '';
        this.mailSent = false;
        this.isProgressVisible = false;

        this.firebaseErrorMessage = '';
    }

    ngOnInit(): void {
        this.afAuth.authState.subscribe(user => {               // if the user is logged in, update the form value with their email address
            if (user) {
                this.email = user.email;
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

    resendVerificationEmail() {
        this.isProgressVisible = true;                          // show the progress indicator as we start the Firebase password reset process

        this.authService.resendVerificationEmail().then((result) => {
            this.isProgressVisible = false;                     // no matter what, when the auth service returns, we hide the progress indicator
            if (result == null) {                               // null is success, false means there was an error
                console.log('verification email resent...');
                this.mailSent = true;
            }
            else if (result.isValid == false) {
                console.log('verification error', result);
                this.firebaseErrorMessage = result.message;
            }
        });
    }

    showResult(){
      this.showMore = true;
    }

    hideResult() {
      this.showMore = false;
    }

}
