import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemeExercisePage } from './theme-exercise.page';

const routes: Routes = [
  {
    path: '',
    component: ThemeExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeExercisePageRoutingModule {}
