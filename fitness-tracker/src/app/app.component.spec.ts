import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { HeaderComponent } from './navigation/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule, Store } from '@ngxs/store';

describe('AppComponent', () => {

  let serviceStub;

  let service: AuthService;
  let fixture, de, component;

  beforeEach(async(() => {
    serviceStub = {
      initAuthListener: () => {
      }
    }

    TestBed.configureTestingModule({
      declarations: [
        AppComponent, SidenavListComponent, HeaderComponent, WelcomeComponent
      ],
      imports: [
        AppRoutingModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        NgxsModule.forRoot()
      ],
      providers: [
        {provide: AuthService, useValue: serviceStub},
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  })

  it('should create the app', (() => {
    expect(component).toBeTruthy();
  }));
});
