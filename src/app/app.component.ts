import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-firebase-dashboard';
  testForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(5)]],
    });
  }

  onSubmit(form: UntypedFormGroup) {
    if (form.invalid) {
      return;
    }

    // form action
  }


  // end
}
