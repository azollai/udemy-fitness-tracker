import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthDataModel } from './auth-data.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { UiService } from '../shared/ui.service';

export const START_LOADING = '[Auth] START_LOADING';
export const STOP_LOADING = '[Auth] STOP_LOADING';
export const START_SIGNUP = '[Auth] START_SIGNUP';
export const START_LOGIN = '[Auth] START_LOGIN';
export const START_LOGOUT = '[Auth] START_LOGOUT';
export const SET_AUTHENTICATED = '[Auth] SET_AUTHENTICATED';
export const UNSET_AUTHENTICATED = '[Auth] UNSET_AUTHENTICATED';

export interface AuthStateModel {
  isLoading: boolean;
  isAuthenticated: boolean;
}

export class StartLoading {
  static readonly type = START_LOADING;
}

export class StopLoading {
  static readonly type = STOP_LOADING;
}

export class StartSignup {
  static readonly type = START_SIGNUP;

  constructor(public payload: AuthDataModel) {
  }
}

export class StartLogin {
  static readonly type = START_LOGIN;

  constructor(public payload: AuthDataModel) {
  }
}

export class StartLogout {
  static readonly type = START_LOGOUT;
}

export class SetAuthenticated {
  static readonly type = SET_AUTHENTICATED;
}

export class UnsetAuthenticated {
  static readonly type = UNSET_AUTHENTICATED;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    isLoading: false,
    isAuthenticated: false
  }
})
export class AuthState {

  constructor(private afAuth: AngularFireAuth,
              private uiService: UiService) {
  }

  @Selector()
  static isLoading(state: AuthStateModel) {
    return state.isLoading;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel) {
    return state.isAuthenticated;
  }

  @Action(StartLoading)
  startLoading({patchState}: StateContext<AuthStateModel>) {
    patchState({
      isLoading: true
    });
  }

  @Action(StopLoading)
  stopLoading({patchState}: StateContext<AuthStateModel>) {
    patchState({
      isLoading: false
    });
  }

  @Action(SetAuthenticated)
  setAuthenticated({patchState}: StateContext<AuthStateModel>) {
    patchState({
      isAuthenticated: true
    });
  }

  @Action(UnsetAuthenticated)
  unsetAuthenticated({patchState}: StateContext<AuthStateModel>) {
    patchState({
      isAuthenticated: false
    });
  }

  @Action(StartSignup)
  startSignup({dispatch}: StateContext<AuthStateModel>, {payload}: StartSignup) {
    dispatch(new StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        dispatch(new StopLoading());
      })
      .catch(error => {
        dispatch(new StopLoading());
        this.uiService.showSnackbar(error.message, null, {duration: 3000});
      });
  }

  @Action(StartLogout)
  startLogout({dispatch}: StateContext<AuthStateModel>) {
    this.afAuth.auth.signOut()
      .then(() => dispatch(new UnsetAuthenticated()));
  }

  @Action(StartLogin)
  startLogin({dispatch}: StateContext<AuthStateModel>, {payload}: StartLogin) {
    dispatch(new StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        dispatch([
          new StopLoading(),
          new SetAuthenticated()
        ]);
      })
      .catch(error => {
        dispatch(new StopLoading());
        this.uiService.showSnackbar(error.message, null, {duration: 3000});
      });
  }
}
