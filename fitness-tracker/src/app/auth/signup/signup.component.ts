import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;

  constructor() {
  }

  ngOnInit() {
    this.maxDate = new Date(2000);
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

}
