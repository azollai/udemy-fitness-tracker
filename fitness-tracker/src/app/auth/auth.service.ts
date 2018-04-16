import {AuthDataModel} from './auth-data.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService) {

  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthDataModel) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
      });
  }

  login(authData: AuthDataModel) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
