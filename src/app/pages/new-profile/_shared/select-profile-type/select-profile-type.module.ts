import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectProfileTypeComponent } from './select-profile-type.component';
import { SelectProfileTypeRoutingModule } from './select-profile-type-routing';
import { CustomSelectModule, LoadingButtonModule, ProfilePreviewModule, SpinnerModule } from 'millez-web-components/dist/components';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SelectProfileTypeComponent
  ],
  imports: [
    CommonModule,
    SelectProfileTypeRoutingModule,
    ProfilePreviewModule,
    CustomSelectModule,
    LoadingButtonModule,
    SpinnerModule,
    TranslateModule.forChild(),
  ],
  providers: [
    TranslatePipe,
  ]
})
export class SelectProfileTypeModule { }
