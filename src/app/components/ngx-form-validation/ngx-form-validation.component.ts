import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'ngx-form-validation',
  templateUrl: './ngx-form-validation.component.html',
  styleUrls: ['./ngx-form-validation.component.css']
})
export class NgxFormValidationComponent {
  testForm: FormGroup;
  testForm2: FormGroup;
  user: Observable<any>;
  showMore: boolean = false;

  title = 'Ngx-Form-Validation';

  constructor(
    private formBuilder: FormBuilder,
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

    var checkboxFormArray = this.testForm.get('checkboxes') as FormArray;
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

  checkboxFormGroupGenerate(): FormGroup {
    return this.formBuilder.group({
        checked: [false, Validators.requiredTrue]
    });
  }

  get formCheckboxDataArray() {
    return <FormArray>this.testForm.get('checkboxes');
  }

  onSubmit(form: FormGroup){
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
