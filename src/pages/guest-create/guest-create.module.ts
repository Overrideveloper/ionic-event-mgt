import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestCreatePage } from './guest-create';

@NgModule({
  declarations: [
    GuestCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(GuestCreatePage),
  ],
  exports: [
    GuestCreatePage
  ]
})
export class GuestCreatePageModule {}
