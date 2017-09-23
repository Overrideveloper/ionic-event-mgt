import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestEditPage } from './guest-edit';

@NgModule({
  declarations: [
    GuestEditPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestEditPage),
  ],
  exports: [
    GuestEditPage
  ]
})
export class GuestEditPageModule {}
