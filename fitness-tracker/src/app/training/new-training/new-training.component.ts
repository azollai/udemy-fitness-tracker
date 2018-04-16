import {Component, OnInit} from '@angular/core';
import {ExerciseModel} from '../exercise.model';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  trainings: ExerciseModel[];

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.trainings = this.trainingService.getExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }


}
