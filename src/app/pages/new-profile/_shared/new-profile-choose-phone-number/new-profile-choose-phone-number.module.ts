import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProfileChoosePhoneNumberComponent } from './new-profile-choose-phone-number.component';
import { NewProfileChoosePhoneNumberRoutingModule } from './new-profile-choose-phone-number-routing.module';
import { LoadingButtonModule, PhoneNumberModule, SpinnerModule } from 'millez-web-components/dist/components';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewProfileChoosePhoneNumberComponent
  ],
  imports: [
    CommonModule,
    NewProfileChoosePhoneNumberRoutingModule,
    PhoneNumberModule,
    SpinnerModule,
    LoadingButtonModule,
    TranslateModule.forChild(),
  ],
  providers: [
    TranslatePipe,
  ]
})
export class NewProfileChoosePhoneNumberModule { }
