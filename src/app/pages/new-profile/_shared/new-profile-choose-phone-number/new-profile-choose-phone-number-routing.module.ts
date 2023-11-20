import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProfileChoosePhoneNumberComponent } from './new-profile-choose-phone-number.component';

const routes: Routes = [{
  path: '',
  component: NewProfileChoosePhoneNumberComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewProfileChoosePhoneNumberRoutingModule { }
