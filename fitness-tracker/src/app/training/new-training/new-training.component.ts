import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Select, Store } from '@ngxs/store';
import * as trainingActions from '../training.state';
import { TrainingState } from '../training.state';

@Component({
             selector: 'app-new-training',
             templateUrl: './new-training.component.html',
             styleUrls: ['./new-training.component.scss']
           })
export class NewTrainingComponent implements OnInit {
  @Select(TrainingState.isLoading) isLoading$: Observable<boolean>;
  @Select(TrainingState.availableExercises) availableExercises$: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new trainingActions.FetchAvailableExercises());
  }

  onStartTraining(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(new trainingActions.SetCurrentExercise(form.value.exercise));
    }
  }
}
