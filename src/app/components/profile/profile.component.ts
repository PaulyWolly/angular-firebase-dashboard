import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: Observable<any>;
  type: string;

  email = 'pwelby@gmail.com';
  website = 'https://www.i-am-paulwelby.com';
  phone = '619-629-3770';

  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore
    ) { }

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
