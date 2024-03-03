import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProfileComponent } from './new-profile.component';
import { NewProfileRoutingModule } from './new-profile-routing.module';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';
import { I18N_CONFIG, LogoModule } from 'millez-web-components/dist/components';
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
      ProfileState
    ]),
    TranslateModule.forRoot(I18N_CONFIG)
  ],
  providers: [
    TranslatePipe
  ]
})
export class NewProfileModule { }
