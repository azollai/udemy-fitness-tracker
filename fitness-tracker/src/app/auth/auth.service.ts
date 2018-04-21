import { AuthDataModel } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngxs/store';
import * as trainingActions from '../training/training.state';
import * as authActions from './auth.state';

@Injectable()
export class AuthService {
  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private store: Store) {

  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new authActions.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch([
          new trainingActions.CancelFbsubs(),
          new authActions.UnsetAuthenticated()
        ]);
        this.router.navigate(['/login']);
      }
    });
  }
}
