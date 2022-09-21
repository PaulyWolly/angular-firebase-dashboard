import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-arrow',
  templateUrl: './menu-arrow.component.html',
  styleUrls: ['./menu-arrow.component.css']
})
export class MenuArrowComponent implements OnInit {

  user: Observable<any>;
  showMore: Boolean = false;
  showLink: Boolean = false;

  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    public route: Router
    ) { }


  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      console.log('Dashboard: user', user);

      if (user == null) {
        console.log("No one logged in")
      } else if (user != null) {

        let emailLower = user.email.toLowerCase();
        this.user = this.firestore.collection('users').doc(emailLower).valueChanges();

        console.log("user.email: ", user.email)

        if (user.email.match('pwelby@gmail.com')) {
          this.showLink = true;
          console.log("Show Newsletter!")
        } else {
          this.showLink = false;
          console.log("Hide newsletter!")
        }
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
