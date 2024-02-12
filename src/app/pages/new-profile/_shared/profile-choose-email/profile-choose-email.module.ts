import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileChooseEmailComponent } from './profile-choose-email.component';
import { ProfileChooseEmailRoutingModule } from './profile-choose-email-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputValidationModule, LoadingButtonModule, SpinnerModule } from 'millez-web-components/dist/components';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProfileChooseEmailComponent
  ],
  imports: [
    CommonModule,
    ProfileChooseEmailRoutingModule,
    InputValidationModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingButtonModule,
    SpinnerModule,
    TranslateModule.forChild(),
  ],
  providers: [
    TranslatePipe,
  ]
})
export class ProfileChooseEmailModule { }
