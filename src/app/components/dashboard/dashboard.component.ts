import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showMore: boolean = false;
  user: Observable<any>;
    // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)this.afAuth.currentUser

    constructor(
      public afAuth: AngularFireAuth,
      private firestore: AngularFirestore
      ) {
        this.user = null;
    }

    ngOnInit(): void {
        this.afAuth.authState.subscribe(user => {
            console.log('Dashboard: user', user);

            if (user) {
                let emailLower = user.email.toLowerCase();
                this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
            }
        });
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
