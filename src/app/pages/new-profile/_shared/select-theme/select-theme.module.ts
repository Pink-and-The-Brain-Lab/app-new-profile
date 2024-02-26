import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectThemeComponent } from './select-theme.component';
import { ChooseDarkProfileIllustrationModule } from 'src/app/illustrations/choose-dark-profile-illustration/choose-dark-profile-illustration.module';
import { ChooseNavyProfileIllustrationModule } from 'src/app/illustrations/choose-navy-profile-illustration/choose-navy-profile-illustration.module';
import { ChooseLightProfileIllustrationModule } from 'src/app/illustrations/choose-light-profile-illustration/choose-light-profile-illustration.module';
import { SelectThemeRoutingModule } from './select-theme-routing';



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
  ]
})
export class SelectThemeModule { }
