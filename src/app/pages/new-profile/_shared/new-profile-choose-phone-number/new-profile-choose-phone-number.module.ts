import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProfileChoosePhoneNumberComponent } from './new-profile-choose-phone-number.component';
import { NewProfileChoosePhoneNumberRoutingModule } from './new-profile-choose-phone-number-routing.module';
import { PhoneNumberModule } from 'millez-components-lib/components';

@NgModule({
  declarations: [
    NewProfileChoosePhoneNumberComponent
  ],
  imports: [
    CommonModule,
    NewProfileChoosePhoneNumberRoutingModule,
    PhoneNumberModule,
  ]
})
export class NewProfileChoosePhoneNumberModule { }
