import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChosenProfileNameComponent } from './chosen-profile-name.component';
import { ChosenProfileNameRoutingModule } from './chosen-profile-name-routing';
import { InputValidationModule, LoadingButtonModule, ProfilePreviewModule, SpinnerModule } from 'millez-web-components/dist/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';
import { TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ChosenProfileNameComponent
  ],
  imports: [
    CommonModule,
    ChosenProfileNameRoutingModule,
    ProfilePreviewModule,
    InputValidationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      ProfileState
    ]),
    SpinnerModule,
    LoadingButtonModule,
  ],
  providers: [
    TranslatePipe,
  ]
})
export class ChosenProfileNameModule { }
