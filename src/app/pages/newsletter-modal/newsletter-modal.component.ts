import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-newsletter-modal',
  templateUrl: './newsletter-modal.component.html',
  styleUrls: ['./newsletter-modal.component.css']
})
export class NewsletterModalComponent implements OnInit {

  dataSource : any;
  id : any;
  name : any;
  email: any;
  personalInfo : any;
  timestamp: any;
  editObj : any;

  isShown: boolean = false;
  showNewsLink: boolean = false;

  @ViewChild('btnShow')
  btnShow!: ElementRef;
  @ViewChild('btnClose')
  btnClose!: ElementRef;

  constructor(
    public afAuth: AngularFireAuth,
    public store: AngularFirestore,
    public route: Router
    ) {}

  ngOnInit(): void {
    this.getAll();
    this.afAuth.onAuthStateChanged((user) => {
          // set up a subscription to always know the login status of the user
            if (user && user.email === 'pwelby@gmail.com') {
              console.log('Newsletter table showing');
              this.isShown = !this.isShown;
            } else {
              this.isShown = this.isShown;
              console.log('Newsletter table hidden');
              // this.openDialog();
            }

    });
  }

  // openDialog(){
  //   this.btnShow.nativeElement.click();
  // }

  // closeDialog(){
  //   this.btnClose.nativeElement.click();
  //   this.route.navigate(['/Login']);
  // }

  close() {
    this.route.navigate(['/Login']);
  }

  getAll(){
    this.store.collection('users')
      .snapshotChanges()
      .subscribe((response) => {
        this.dataSource = response.map(item => {
        return Object.assign({id : item.payload.doc.id}, item.payload.doc.data())
      });
    })
  }

  add(){

    const todayDate = new Date();
    console.log("Date now: ", todayDate)

    console.log('Timestamp: ' +  this.timestamp);
    if(this.editObj){
      this.store.collection('list')
        .doc(this.editObj.id)
        .update({
          name : this.name,
          personalInfo : this.personalInfo,
          email : this.email,
          timeStamp : todayDate
        });
    } else {
      this.store.collection('list')
        .add({
          name : this.name,
          personalInfo : this.personalInfo,
          email : this.email,
          timeStamp : todayDate
        });
    }
    // this.closeDialog();

    this.route.navigate(['/Login']);
    setTimeout(("alert('Your Newsletter info was saved'); ") , 5)

  }

  edit(id : string){
    this.store.collection('users')
      .doc(id)
      .get()
      .subscribe((response) => {
        this.editObj = Object.assign({id : response.id}, response.data());
        this.name = this.editObj.name;
        this.personalInfo = this.editObj.personalInfo;
        this.email = this.editObj.email;
        // this.openDialog();
      })
  }

  delete(id : string){
    const result = confirm('Are you sure you wish to delete?');
    if (result) {
      this.store.collection('users').doc(id).delete();
    }
  }

}
//Quick example
// <!--output 'Jun 15, 2015, 9:03:01 AM'-->
// <div>{{myObj.timestamp.seconds * 1000 | date:'medium'}}</div>

/*
Pre-defined format options

Examples are given in en-US locale.

'short': equivalent to 'M/d/yy, h:mm a' (6/15/15, 9:03 AM).
'medium': equivalent to 'MMM d, y, h:mm:ss a' (Jun 15, 2015, 9:03:01 AM).
'long': equivalent to 'MMMM d, y, h:mm:ss a z' (June 15, 2015 at 9:03:01 AM GMT+1).
'full': equivalent to 'EEEE, MMMM d, y, h:mm:ss a zzzz' (Monday, June 15, 2015 at 9:03:01 AM GMT+01:00).
'shortDate': equivalent to 'M/d/yy' (6/15/15).
'mediumDate': equivalent to 'MMM d, y' (Jun 15, 2015).
'longDate': equivalent to 'MMMM d, y' (June 15, 2015).
'fullDate': equivalent to 'EEEE, MMMM d, y' (Monday, June 15, 2015).
'shortTime': equivalent to 'h:mm a' (9:03 AM).
'mediumTime': equivalent to 'h:mm:ss a' (9:03:01 AM).
'longTime': equivalent to 'h:mm:ss a z' (9:03:01 AM GMT+1).
'fullTime': equivalent to 'h:mm:ss a zzzz' (9:03:01 AM GMT+01:00).

*/
