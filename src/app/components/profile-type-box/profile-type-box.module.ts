import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileTypeBoxComponent } from './profile-type-box.component';

@NgModule({
  declarations: [
    ProfileTypeBoxComponent
  ],
  exports: [
    ProfileTypeBoxComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileTypeBoxModule { }
