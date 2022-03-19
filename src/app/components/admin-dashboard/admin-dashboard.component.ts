import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

    user: Observable<any>;
    showMore: boolean = false;
    // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

    constructor(
      public afAuth: AngularFireAuth,
      private firestore: AngularFirestore
      ) {
        this.user = null;
    }

    ngOnInit(): void {
        this.afAuth.authState.subscribe(user => {                                                   // grab the user object from Firebase Authorization
            if (user) {
                let emailLower = user.email.toLowerCase();
                this.user = this.firestore.collection('users').doc(emailLower).valueChanges();      // get the user's doc in Cloud Firestore
            }
        });
    }

    showResult(){
      this.showMore = true;
    }

    hideResult() {
      this.showMore = false;
    }

    changeArrow(): void {
      console.log('switch arrow')
    }

    logout(): void {
        this.afAuth.signOut();
        window.location.reload();
    }
}
