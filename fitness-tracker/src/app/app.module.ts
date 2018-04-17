import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {AuthService} from './auth/auth.service';
import {TrainingService} from './training/training.service';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {UiService} from './shared/ui.service';
import {AuthModule} from './auth/auth.module';
import {TrainingModule} from './training/training.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFirestoreModule} from 'angularfire2/firestore';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    AppRoutingModule,
    AuthModule,

  ],
  providers: [AuthService, TrainingService, UiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
