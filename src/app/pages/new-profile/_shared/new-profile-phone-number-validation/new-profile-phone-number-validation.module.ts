import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProfilePhoneNumberValidationComponent } from './new-profile-phone-number-validation.component';
import { NewProfileChoosePhoneNumberRoutingModule } from './new-profile-phone-number-validation-routing.module';
import { CodeValidationModule } from 'millez-components-lib/components';

@NgModule({
  declarations: [
    NewProfilePhoneNumberValidationComponent
  ],
  imports: [
    CommonModule,
    NewProfileChoosePhoneNumberRoutingModule,
    CodeValidationModule,
  ]
})
export class NewProfilePhoneNumberValidationModule { }
