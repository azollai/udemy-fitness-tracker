import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ExerciseModel } from '../exercise.model';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  trainings: ExerciseModel[];
  isLoading = true;
  private exerciseSubscribtion: Subscription;
  private loadingSubscription: Subscription;

  constructor(private trainingService: TrainingService,
              private uiService: UiService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.exerciseSubscribtion = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.trainings = exercises;
      });
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    if (form.valid) {
      this.trainingService.startExercise(form.value.exercise);
    }
  }

  ngOnDestroy() {
    if (this.exerciseSubscribtion) {
      this.exerciseSubscribtion.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

}
