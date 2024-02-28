import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectThemeComponent } from './select-theme.component';
import { ChooseDarkProfileIllustrationModule } from 'src/app/illustrations/choose-dark-profile-illustration/choose-dark-profile-illustration.module';
import { ChooseNavyProfileIllustrationModule } from 'src/app/illustrations/choose-navy-profile-illustration/choose-navy-profile-illustration.module';
import { ChooseLightProfileIllustrationModule } from 'src/app/illustrations/choose-light-profile-illustration/choose-light-profile-illustration.module';
import { SelectThemeRoutingModule } from './select-theme-routing';
import { LoadingButtonModule, SpinnerModule } from 'millez-web-components/dist/components';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';
import { TranslatePipe } from '@ngx-translate/core';
import { ChoosePurpleProfileIllustrationModule } from 'src/app/illustrations/choose-purple-profile-illustration/choose-purple-profile-illustration.module';
import { ChooseLightPurpleProfileIllustrationModule } from 'src/app/illustrations/choose-light-purple-profile-illustration/choose-light-purple-profile-illustration.module';

@NgModule({
  declarations: [
    SelectThemeComponent
  ],
  imports: [
    CommonModule,
    SelectThemeRoutingModule,
    ChooseDarkProfileIllustrationModule,
    ChooseNavyProfileIllustrationModule,
    ChooseLightProfileIllustrationModule,
    ChoosePurpleProfileIllustrationModule,
    ChooseLightPurpleProfileIllustrationModule,
    LoadingButtonModule,
    SpinnerModule,
    NgxsModule.forRoot([
      ProfileState
    ]),
  ],
  providers: [
    TranslatePipe,
  ]
})
export class SelectThemeModule { }
