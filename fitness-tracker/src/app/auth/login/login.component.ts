import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import * as authActions from '../auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  emailControl: FormControl;
  passwordControl: FormControl;
  @Select() isLoading$: Observable<boolean>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(new authActions.StartLogin({
        email: this.form.value.email,
        password: this.form.value.password
      }));
    }
  }

  private initForm() {
    this.emailControl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordControl = new FormControl('', Validators.required);
    this.form = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl
    });
  }
}


