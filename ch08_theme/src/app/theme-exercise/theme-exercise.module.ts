import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThemeExercisePageRoutingModule } from './theme-exercise-routing.module';

import { ThemeExercisePage } from './theme-exercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThemeExercisePageRoutingModule
  ],
  declarations: [ThemeExercisePage]
})
export class ThemeExercisePageModule {}
