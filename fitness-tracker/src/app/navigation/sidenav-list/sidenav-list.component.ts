import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Select, Store } from '@ngxs/store';
import * as authActions from '../../auth/auth.state';
import { AuthState } from '../../auth/auth.state';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent {

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
