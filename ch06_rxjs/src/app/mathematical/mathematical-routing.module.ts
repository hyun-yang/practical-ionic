import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MathematicalPage } from './mathematical.page';

const routes: Routes = [
  {
    path: '',
    component: MathematicalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MathematicalPageRoutingModule {}
