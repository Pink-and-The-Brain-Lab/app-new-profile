import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvideYourChosenNameComponent } from './provide-your-chosen-name.component';
import { ProvideYourChosenNameRoutingModule } from './provide-your-chosen-name-routing';
import { InputValidationModule, ProfilePreviewModule } from 'millez-web-components/dist/components';
import { ProfileState } from 'src/app/states/state/profile.state';
import { NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProvideYourChosenNameComponent
  ],
  imports: [
    CommonModule,
    ProvideYourChosenNameRoutingModule,
    ProfilePreviewModule,
    InputValidationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      ProfileState
    ]),
  ]
})
export class ProvideYourChosenNameModule { }
