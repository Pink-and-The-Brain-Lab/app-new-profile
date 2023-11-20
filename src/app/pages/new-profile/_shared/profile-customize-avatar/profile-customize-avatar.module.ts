import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCustomizeAvatarComponent } from './profile-customize-avatar.component';
import { ProfileCustomizeAvatarRoutingModule } from './profile-customize-avatar-routing.module';
import { ChoseImageModule, ColorSelectorModule, CropperModule, ModalModule, ProfilePreviewModule } from 'millez-components-lib/components';
import { ProfileState } from 'src/app/states/state/profile.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [
    ProfileCustomizeAvatarComponent
  ],
  imports: [
    CommonModule,
    ProfileCustomizeAvatarRoutingModule,
    ProfilePreviewModule,
    ChoseImageModule,
    ColorSelectorModule,
    ModalModule,
    CropperModule,
    NgxsModule.forRoot([
      ProfileState
    ])
  ]
})
export class ProfileCustomizeAvatarModule { }
