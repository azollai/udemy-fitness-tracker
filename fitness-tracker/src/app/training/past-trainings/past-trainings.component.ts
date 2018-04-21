import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ExerciseModel } from '../exercise.model';
import { Store } from '@ngxs/store';
import * as trainingActions from '../training.state';
import { TrainingStateModel } from '../training.state';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<ExerciseModel>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(state => state.training.completedOrCancelledExercises)
      .subscribe(exercises => {
        if (exercises) {
          this.dataSource.data = exercises;
        }
      });
    this.store.dispatch(new trainingActions.FetchCompletedOrCancelledExercises());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
