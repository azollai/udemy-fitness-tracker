import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UiService } from '../../shared/ui.service';
import * as authActions from '../auth.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  submitPressed: boolean;
  @Select() isLoading$: Observable<boolean>;

  constructor(private store: Store,
              private uiService: UiService) {
  }

  ngOnInit() {
    this.maxDate = new Date(2000, 1, 1);

  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(new authActions.StartSignup({
        email: form.value.email,
        password: form.value.password
      }));
    }
  }

}
