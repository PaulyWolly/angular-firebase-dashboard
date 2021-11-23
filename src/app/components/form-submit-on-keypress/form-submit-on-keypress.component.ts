import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-form-submit-on-keypress',
  templateUrl: './form-submit-on-keypress.component.html',
  styleUrls: ['./form-submit-on-keypress.component.css']
})
export class FormSubmitOnKeypressComponent implements OnInit {

  msg: any = 'Enter something';
  myForm: any;
  user: Observable<any>

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

  onKeydown(event) {
    if (event.key === "Enter") {
      console.log(event);
      alert('Enter Key pressed');
    }
    if (event.key === "Shift") {
      console.log(event);
      alert('Shift key pressed');
    }
    if (event.key === "Arrowup") {
      console.log(event);
      alert('Arrow UP Key pressed');
    }
    if (event.key === "Arrowdown") {
      console.log(event);
      alert('Arrow DOWN key pressed');
    }
    if (event.key === "Backspace") {
      console.log(event);
      alert('Backspace Key pressed');
    }


  }

}
