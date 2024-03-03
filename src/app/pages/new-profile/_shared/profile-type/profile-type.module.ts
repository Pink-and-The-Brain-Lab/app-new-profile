import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileTypeComponent } from './profile-type.component';
import { ProfileTypeRoutingModule } from './profile-type-routing.module';
import { CreateNewProfileIllustrationModule } from 'src/app/illustrations/create-new-profile-illustration/create-new-profile-illustration.module';
import { CreateNewOrganizationIllustrationModule } from 'src/app/illustrations/create-new-organization-illustration/create-new-organization-illustration.module';
import { ProfileTypeBoxModule } from 'src/app/components/profile-type-box/profile-type-box.module';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProfileTypeComponent
  ],
  imports: [
    CommonModule,
    ProfileTypeRoutingModule,
    ProfileTypeBoxModule,
    CreateNewProfileIllustrationModule,
    CreateNewOrganizationIllustrationModule,
    TranslateModule.forChild(),
  ],
  providers: [
    TranslatePipe,
  ]
})
export class ProfileTypeModule { }
