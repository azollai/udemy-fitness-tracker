import {UserModel} from './user.model';
import {AuthDataModel} from './auth-data.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: UserModel;

  constructor(private router: Router) {

  }

  registerUser(authData: AuthDataModel) {
    this.user = {
      email: authData.email,
      userId: 1
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  login(authData: AuthDataModel) {
    this.user = {
      email: authData.email,
      userId: 1
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  getUser() {
    return {...this.user};
  }

  isAuth() {
    return this.user !== null;
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
}
