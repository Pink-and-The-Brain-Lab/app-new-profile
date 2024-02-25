import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectProfileTypeComponent } from './select-profile-type.component';
import { SelectProfileTypeRoutingModule } from './select-profile-type-routing';
import { CustomSelectModule, LoadingButtonModule, ProfilePreviewModule, SpinnerModule } from 'millez-web-components/dist/components';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';
import { TranslatePipe } from '@ngx-translate/core';

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
    NgxsModule.forRoot([
      ProfileState
    ]),
  ],
  providers: [
    TranslatePipe,
  ]
})
export class SelectProfileTypeModule { }
