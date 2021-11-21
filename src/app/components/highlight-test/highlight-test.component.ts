import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
selector: 'highlight-test.html',
templateUrl: './highlight-test.component.html',
styleUrls: ['./highlight-test.component.css']
})

export class HighlightTestComponent implements OnInit {

color: string;user: Observable<any>;

constructor(public afAuth: AngularFireAuth,
            public firestore: AngularFirestore
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

}
