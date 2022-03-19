import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-directive-demo',
  templateUrl: './directive-demo.component.html',
  styleUrls: ['./directive-demo.component.css']
})
export class DirectiveDemoComponent implements OnInit {

  // variables
  user: Observable<any>;
  color: string;
  showMore: boolean = false;

  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    public elementRef: ElementRef,
    public renderer: Renderer2
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

  resetPage() {
    window.location.reload();
  }

  setBgColor(color: string) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      color
    )
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
