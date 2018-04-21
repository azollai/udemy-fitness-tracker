import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { Store } from '@ngxs/store';
import * as trainingActions from '../training.state';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog, private store: Store) {
  }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(state => state.training.currentExercise).take(1)
      .subscribe(exercise => {
        if (exercise) {
          const step = exercise.duration / 100 * 1000;
          this.timer = +setInterval(() => {
            this.progress = this.progress + 5;
            if (this.progress >= 100) {
              this.store.dispatch(new trainingActions.CompleteCurrentExercise());
              clearInterval(this.timer);
            }
          }, step);
        }
        ;
      });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent,
      {
        data: {
          progress: this.progress
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new trainingActions.CancelCurrentExercise(this.progress));
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
