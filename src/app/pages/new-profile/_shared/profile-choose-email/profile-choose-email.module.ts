import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileChooseEmailComponent } from './profile-choose-email.component';
import { ProfileChooseEmailRoutingModule } from './profile-choose-email-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputValidationModule, LoadingButtonModule, SpinnerModule } from 'millez-components-lib/components';

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
  ]
})
export class ProfileChooseEmailModule { }
