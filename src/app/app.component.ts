import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-firebase-dashboard';
  testForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(5)]],
    });
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    // form action
  }


  // end
}
