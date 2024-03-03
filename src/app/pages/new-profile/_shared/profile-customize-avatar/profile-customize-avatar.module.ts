import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCustomizeAvatarComponent } from './profile-customize-avatar.component';
import { ProfileCustomizeAvatarRoutingModule } from './profile-customize-avatar-routing.module';
import { ChoseImageModule, ColorSelectorModule, CropperModule, LoadingButtonModule, ModalModule, ProfilePreviewModule, SpinnerModule } from 'millez-web-components/dist/components';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

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
    SpinnerModule,
    LoadingButtonModule,
    TranslateModule.forChild(),
  ],
  providers: [
    TranslatePipe,
  ]
})
export class ProfileCustomizeAvatarModule { }
