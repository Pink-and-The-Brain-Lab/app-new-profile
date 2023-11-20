import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProfilePhoneNumberValidationComponent } from './new-profile-phone-number-validation.component';

const routes: Routes = [{
  path: '',
  component: NewProfilePhoneNumberValidationComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewProfileChoosePhoneNumberRoutingModule { }
