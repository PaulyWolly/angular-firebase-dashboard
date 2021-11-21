import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'custom-pipe',
  templateUrl: './custom-pipe.component.html',
  styleUrls: ['./custom-pipe.component.css']
})
export class CustomPipeComponent implements OnInit {

  ourString: string = "Jangles Bo Mr.";
  user: Observable<any>;
  customText: string = "Java is to JavaScript as car is to Carpet.";

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

}
