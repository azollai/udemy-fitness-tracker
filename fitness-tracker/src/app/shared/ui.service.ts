import {Subject} from 'rxjs/Subject';

export class UiService {
  loadingStateChanged = new Subject<boolean>();
}
