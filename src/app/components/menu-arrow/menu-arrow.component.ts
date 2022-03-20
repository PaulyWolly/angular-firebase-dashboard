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

  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    public route: Router
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

  showResult(){
    this.showMore = true;
  }

  hideResult() {
    this.showMore = false;
  }

}
