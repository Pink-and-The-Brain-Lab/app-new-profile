import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProfileComponent } from './new-profile.component';
import { NewProfileRoutingModule } from './new-profile-routing.module';

@NgModule({
  declarations: [
    NewProfileComponent
  ],
  imports: [
    CommonModule,
    NewProfileRoutingModule,
  ]
})
export class NewProfileModule { }
