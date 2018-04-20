import {NgModule} from '@angular/core';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
  MatProgressSpinnerModule, MatSnackBarModule
} from '@angular/material';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthRoutingModule} from './auth-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,

    AngularFireAuthModule,

    AuthRoutingModule
  ],
  exports: []
})
export class AuthModule {

}
