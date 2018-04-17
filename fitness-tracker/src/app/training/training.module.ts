import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSortModule, MatTableModule, MatTabsModule
} from '@angular/material';
import {PastTrainingsComponent} from './past-trainings/past-trainings.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {TrainingComponent} from './training.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {StopTrainingComponent} from './current-training/stop-training/stop-training.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {TrainingRoutingModule} from './training-routing.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,

    TrainingRoutingModule
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
