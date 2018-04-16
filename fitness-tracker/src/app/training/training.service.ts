import {ExerciseModel} from './exercise.model';
import {Subject} from 'rxjs/Subject';

export class TrainingService {
  exerciseChanged = new Subject<ExerciseModel>();
  private availableExercises: ExerciseModel[] = [
    {id: 'crunches', calories: 8, duration: 30, name: 'Crunches'},
    {id: 'touch-toes', calories: 15, duration: 90, name: 'Touch Toes'},
    {id: 'side-lunges', calories: 18, duration: 120, name: 'Side Lunges'},
    {id: 'burpees', calories: 20, duration: 12, name: 'Burpees'},
  ];
  private exercises: ExerciseModel[] = [];
  private runningExercise: ExerciseModel;

  getExercises(): ExerciseModel[] {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  completeExercise() {
    this.exercises.push(
      {
        ...this.runningExercise,
        date: new Date(),
        state: 'completed'
      });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push(
      {
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'canceled'
      });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
