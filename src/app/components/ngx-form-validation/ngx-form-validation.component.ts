import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'ngx-form-validation',
  templateUrl: './ngx-form-validation.component.html',
  styleUrls: ['./ngx-form-validation.component.css']
})
export class NgxFormValidationComponent {
  testForm: UntypedFormGroup;
  testForm2: UntypedFormGroup;
  user: Observable<any>;
  showMore: boolean = false;

  title = 'Ngx-Form-Validation';

  constructor(
    private formBuilder: UntypedFormBuilder,
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore
    ) {

  }

  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
        firstName: [null, [Validators.required, Validators.maxLength(5)]],
        familyName: [null, [Validators.required, Validators.maxLength(5)]],
        checkboxes: this.formBuilder.array([]),
    });

    this.testForm2 = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.maxLength(5)]],
      familyName: [null, [Validators.required, Validators.maxLength(5)]],
      checkboxes: this.formBuilder.array([]),
  });

    var checkboxFormArray = this.testForm.get('checkboxes') as UntypedFormArray;
    [1, 2].forEach(item => {
      checkboxFormArray.push(this.checkboxFormGroupGenerate());
    });

    this.afAuth.authState.subscribe(user => {
      console.log('Dashboard: user', user);

      if (user) {
          let emailLower = user.email.toLowerCase();
          this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
      }
    });
  }

  checkboxFormGroupGenerate(): UntypedFormGroup {
    return this.formBuilder.group({
        checked: [false, Validators.requiredTrue]
    });
  }

  get formCheckboxDataArray() {
    return <UntypedFormArray>this.testForm.get('checkboxes');
  }

  onSubmit(form: UntypedFormGroup){
      if (form.invalid) {
          return;
      }

      //Form action
  }

  resetForm(ngForm: FormGroupDirective) {
    ngForm.resetForm();
  }

  logout(): void {
    this.afAuth.signOut();
    window.location.reload();
  }

  showResult(){
    this.showMore = true;
  }

  hideResult() {
    this.showMore = false;
  }

}
