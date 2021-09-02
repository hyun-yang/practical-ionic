import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCoinPage } from './add-coin.page';

const routes: Routes = [
  {
    path: '',
    component: AddCoinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCoinPageRoutingModule {}
