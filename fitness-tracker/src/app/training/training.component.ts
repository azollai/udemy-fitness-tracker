import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { TrainingState } from './training.state';
import { Observable } from 'rxjs/Observable';
import { ExerciseModel } from './exercise.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
  @Select(TrainingState.currentExercise) currentExercise$: Observable<ExerciseModel>;
}
