import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrViewPage } from './qr-view.page';

const routes: Routes = [
  {
    path: '',
    component: QrViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrViewPageRoutingModule {}
