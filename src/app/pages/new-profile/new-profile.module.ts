import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProfileComponent } from './new-profile.component';
import { NewProfileRoutingModule } from './new-profile-routing.module';
import { NgxsModule } from '@ngxs/store';
import { I18N_CONFIG, LogoModule, UpdateProfileState } from 'millez-web-components/dist/components';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewProfileComponent
  ],
  imports: [
    CommonModule,
    NewProfileRoutingModule,
    LogoModule,
    NgxsModule.forRoot([
      UpdateProfileState,
    ]),
    TranslateModule.forRoot(I18N_CONFIG)
  ],
  providers: [
    TranslatePipe
  ]
})
export class NewProfileModule { }
