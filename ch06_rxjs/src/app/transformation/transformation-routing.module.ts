import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransformationPage } from './transformation.page';

const routes: Routes = [
  {
    path: '',
    component: TransformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransformationPageRoutingModule {}
