import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProfilePhoneNumberValidationComponent } from './new-profile-phone-number-validation.component';
import { NewProfileChoosePhoneNumberRoutingModule } from './new-profile-phone-number-validation-routing.module';
import { CodeValidationModule, LoadingButtonModule, SpinnerModule } from 'millez-web-components/dist/components';
import { TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewProfilePhoneNumberValidationComponent
  ],
  imports: [
    CommonModule,
    NewProfileChoosePhoneNumberRoutingModule,
    CodeValidationModule,
    SpinnerModule,
    LoadingButtonModule,
  ],
  providers: [
    TranslatePipe,
  ]
})
export class NewProfilePhoneNumberValidationModule { }
