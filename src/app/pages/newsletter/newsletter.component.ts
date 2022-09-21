import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import {title} from 'process';
// import { NewsletterModalComponent } from '../newsletter-modal/newsletter-modal.component';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  isShown: boolean = true;
  showNewsLink: boolean = false;

  dataSource: any;
  id: any;
  displayName: any;
  email: any;
  userDescription: any;
  editObj: any;

  @ViewChild('btnShow')
  btnShow!: ElementRef;
  @ViewChild('btnClose')
  btnClose!: ElementRef;

  @ViewChild(MatSort)
    sort!: MatSort;

  constructor(
    private store: AngularFirestore,
    public afAuth: AngularFireAuth,
    private route: Router
  ){}

  ngOnInit(){
    this.getAll();
    this.afAuth.onAuthStateChanged((user) => {
          // set up a subscription to always know the login status of the user
            if (user && user.email === 'pwelby@gmail.com') {
              console.log('Newsletter table showing');
              this.isShown = this.isShown;
            } else {
              this.isShown = !this.isShown;
              console.log('Newsletter table hidden');
              this.openDialog(title);
            }

    });
  }

  openDialog(title: string){
    this.btnShow.nativeElement.click();
  }

  closeDialog(){
    this.btnClose.nativeElement.click();
    // this.route.navigate(['/Login']);
  }

  clearEdit(){
    this.editObj = null;
    this.displayName = "";
    this.userDescription = "";
    this.email = "";
  }

  add(){
    if(this.editObj){
      this.store.collection('users')
        .doc(this.editObj.id)
        .update({displayName : this.displayName, userDescription : this.userDescription, email : this.email});
    } else {
      this.store.collection('users')
        .add({displayName : this.displayName, userDescription : this.userDescription, email : this.email});
    }
    this.closeDialog();

    // this.route.navigate(['/Login']);
    setTimeout(("alert('Your Newsletter info was saved'); ") , 5)

  }

  edit(id: string){
    this.store.collection('users')
      .doc(id)
      .get()
      .subscribe((response) => {
        this.editObj = Object.assign({id : response.id}, response.data());
        this.displayName = this.editObj.displayName;
        this.userDescription = this.editObj.userDescription;
        this.email = this.editObj.email;

        this.openDialog(title);
      })
  }

  delete(id : string){
    const result = confirm('Are you sure you wish to delete?');
    if (result) {
      this.store.collection('users').doc(id).delete();
    }
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

  goBack() {
    window.history.go(-1);
  }

  onMatSortChange() {
    this.dataSource.sort = this.sort;
  }

}
