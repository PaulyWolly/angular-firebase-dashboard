import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-pipe-demo',
  templateUrl: './pipe-demo.component.html',
  styleUrls: ['./pipe-demo.component.css']
})
export class PipeDemoComponent implements OnInit {

    user: Observable<any>;
    customText = "The rain in Spain stays mainly on the plain."
    squaredValue: number = 0;
    Fdegrees:number;
    Cdegrees:number
    sentence: string;
    outPut: any;
    output: any;

    constructor(
      public afAuth: AngularFireAuth,
      private firestore: AngularFirestore,
      public router: Router
      ) {

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

    logout(): void {
      this.afAuth.signOut();
      window.location.reload();
    }
}
