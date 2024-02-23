import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProfileComponent } from './new-profile.component';
import { NewProfileRoutingModule } from './new-profile-routing.module';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';

@NgModule({
  declarations: [
    NewProfileComponent
  ],
  imports: [
    CommonModule,
    NewProfileRoutingModule,
    NgxsModule.forRoot([
      ProfileState
    ], {}),
  ]
})
export class NewProfileModule { }
