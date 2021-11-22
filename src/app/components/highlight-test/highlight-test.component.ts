import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
selector: 'highlight-test.html',
templateUrl: './highlight-test.component.html',
styleUrls: ['./highlight-test.component.css']
})

export class HighlightTestComponent implements OnInit {

  color: string;
  user: Observable<any>;

  constructor(public afAuth: AngularFireAuth,
              public firestore: AngularFirestore,
              public router: Router
    ) {}

  ngOnInit(): void {

    this.afAuth.authState.subscribe(user => {
        console.log('Dashboard: user', user);

        if (user) {
            let emailLower = user.email.toLowerCase();
            this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
        }
      });
  }

  logout(): void {

    this.router.navigate(['/home']);

    this.afAuth.signOut();
    window.location.reload();

    /* setTimeout(() => {

    }, 200); */

  }

}
