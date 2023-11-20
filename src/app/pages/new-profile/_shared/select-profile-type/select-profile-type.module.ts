import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectProfileTypeComponent } from './select-profile-type.component';
import { SelectProfileTypeRoutingModule } from './select-profile-type-routing';
import { CustomSelectModule, LoadingButtonModule, ProfilePreviewModule, SpinnerModule } from 'millez-components-lib/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';

@NgModule({
  declarations: [
    SelectProfileTypeComponent
  ],
  imports: [
    CommonModule,
    SelectProfileTypeRoutingModule,
    ProfilePreviewModule,
    FormsModule,
    ReactiveFormsModule,
    CustomSelectModule,
    LoadingButtonModule,
    SpinnerModule,
    NgxsModule.forRoot([
      ProfileState
    ]),
  ]
})
export class SelectProfileTypeModule { }
