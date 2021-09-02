import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObservablePage } from './observable.page';

const routes: Routes = [
  {
    path: '',
    component: ObservablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObservablePageRoutingModule {}
