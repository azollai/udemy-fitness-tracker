import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ExerciseModel } from './exercise.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { UiService } from '../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from '../app.state';

export const START_LOADING = '[Train] START_LOADING';
export const STOP_LOADING = '[Train] STOP_LOADING';
export const FETCH_AVAILABLE_EXERCISES = '[Train] FETCH_AVAILABLE_EXERCISES';
export const SET_CURRENT_EXERCISE = '[Train] SET_CURRENT_EXERCISE';
export const COMPLETE_CURRENT_EXERCISE = '[Train] COMPLETE_CURRENT_EXERCISE';
export const CANCEL_CURRENT_EXERCISE = '[Train] CANCEL_CURRENT_EXERCISE';
export const CANCEL_FBSUBS = '[Train] CANCEL_FBSUBS';
export const FETCH_COMPLETED_OR_CANCELLED_EXERCISES = '[Train] FETCH_COMPLETED_OR_CANCELLED_EXERCISES';

// export interface TrainingState extends AppState {
//   training: TrainingStateModel;
// }

export interface TrainingStateModel {
  isLoading: boolean;
  availableExercises: ExerciseModel[];
  completedOrCancelledExercises: ExerciseModel[];
  currentExercise: ExerciseModel;
  fbSubs: Subscription[];
}

export class StartLoading {
  static readonly type = START_LOADING;
}

export class StopLoading {
  static readonly type = STOP_LOADING;
}

export class FetchAvailableExercises {
  static readonly type = FETCH_AVAILABLE_EXERCISES;
}

export class SetCurrentExercise {
  static readonly type = SET_CURRENT_EXERCISE;

  constructor(public payload: string) {
  }
}

export class CompleteCurrentExercise {
  static readonly type = COMPLETE_CURRENT_EXERCISE;
}

export class CancelCurrentExercise {
  static readonly type = CANCEL_CURRENT_EXERCISE;

  constructor(public payload: number) {
  }
}

export class CancelFbsubs {
  static readonly type = CANCEL_FBSUBS;
}

export class FetchCompletedOrCancelledExercises {
  static readonly type = FETCH_COMPLETED_OR_CANCELLED_EXERCISES;
}


@State<TrainingStateModel>({
  name: 'training',
  defaults: {
    isLoading: false,
    availableExercises: [],
    completedOrCancelledExercises: [],
    currentExercise: null,
    fbSubs: []
  }
})
export class TrainingState {
  constructor(private db: AngularFirestore,
              private uiService: UiService) {
  }

  @Selector()
  static isLoading(state: TrainingStateModel) {
    return state.isLoading;
  }

  @Selector()
  static availableExercises(state: TrainingStateModel) {
    return state.availableExercises;
  }

  @Selector()
  static currentExercise(state: TrainingStateModel) {
    return state.currentExercise;
  }

  @Action(StartLoading)
  startLoading({getState, setState}: StateContext<TrainingStateModel>) {
    const state = getState();
    setState({
      ...state,
      isLoading: true
    });
  }

  @Action(StopLoading)
  stopLoading({patchState}: StateContext<TrainingStateModel>) {
    patchState({
      isLoading: false
    });
  }

  @Action(FetchAvailableExercises)
  fetchAvailableExercises({getState, patchState, dispatch}: StateContext<TrainingStateModel>) {
    dispatch(new StartLoading());
    const state = getState();
    let fbSub: Subscription;
    fbSub = (this.db.collection('availableExercises')
      .snapshotChanges()
      .map(
        docArray => {
          // throw(new Error());
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories
            };
          });
        }
      )
      .subscribe((exercises: ExerciseModel[]) => {
        dispatch(new StopLoading());
        patchState({
          availableExercises: exercises
        });
      }, error => {
        dispatch(new StopLoading());
        this.uiService.showSnackbar('Fetching Exercises failed, try it again later', null, {duration: 3000});
        patchState({
          availableExercises: null
        });
      }));
    patchState({
      fbSubs: [...state.fbSubs, fbSub]
    });
  }

  @Action(SetCurrentExercise)
  setCurrentExercise({getState, patchState}: StateContext<TrainingStateModel>, {payload}: SetCurrentExercise) {
    const state = getState();
    const exercise = state.availableExercises.find(ex => ex.id === payload);
    return patchState({
      currentExercise: {...exercise}
    });
  }

  @Action(CompleteCurrentExercise)
  completeCurrentExercise({getState, patchState}: StateContext<TrainingStateModel>) {
    const state = getState();
    this.addDataToDatabase(
      {
        ...state.currentExercise,
        date: new Date(),
        state: 'completed'
      });
    patchState({
      currentExercise: null
    });
  }

  @Action(CancelCurrentExercise)
  cancelCurrentExercise({getState, patchState}: StateContext<TrainingStateModel>, {payload}: CancelCurrentExercise) {
    const state = getState();
    this.addDataToDatabase(
      {
        ...state.currentExercise,
        duration: state.currentExercise.duration * (payload / 100),
        calories: state.currentExercise.calories * (payload / 100),
        date: new Date(),
        state: 'cancelled'
      });
    patchState({
      currentExercise: null
    });
  }

  @Action(CancelFbsubs)
  cancelFbsubs({getState, patchState}: StateContext<TrainingStateModel>) {
    const state = getState();
    state.fbSubs.forEach(sub => sub.unsubscribe());
    patchState({
      fbSubs: []
    });
  }

  @Action(FetchCompletedOrCancelledExercises)
  fetchCompletedOrCancelledExercises({dispatch, getState, patchState}: StateContext<TrainingStateModel>) {
    dispatch(new StartLoading());
    const state = getState();
    let fbSub: Subscription;
    fbSub = (this.db.collection('finishedExercises').valueChanges().subscribe(
      (exercises: ExerciseModel[]) => {
        dispatch(new StopLoading());
        patchState({
          completedOrCancelledExercises: exercises
        });
      }
      , err => {
        dispatch(new StopLoading());
        this.uiService.showSnackbar('Fetching FinishedExercises failed, try it again later', null, {duration: 3000});
      }));
    patchState({
      fbSubs: [...state.fbSubs, fbSub]
    });
  }

  private addDataToDatabase(exercise: ExerciseModel) {
    this.db.collection('finishedExercises').add(exercise);
  }

}
