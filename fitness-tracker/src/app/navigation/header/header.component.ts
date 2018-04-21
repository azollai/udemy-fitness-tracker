import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs/Subscription';
import * as authActions from '../../auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { AuthState } from '../../auth/auth.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private store: Store) {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.store.dispatch(new authActions.StartLogout());
  }

}
