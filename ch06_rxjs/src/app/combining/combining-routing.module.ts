import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CombiningPage } from './combining.page';

const routes: Routes = [
  {
    path: '',
    component: CombiningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CombiningPageRoutingModule {}
