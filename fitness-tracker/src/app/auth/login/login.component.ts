import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  emailControl: FormControl;
  passwordControl: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.emailControl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordControl = new FormControl('', Validators.required);
    this.form = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl
    });
  }

  onSubmit() {
    console.log(this.form);
  }

}
