import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileCustomizeAvatarComponent } from './profile-customize-avatar.component';

const routes: Routes = [{
  path: '',
  component: ProfileCustomizeAvatarComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileCustomizeAvatarRoutingModule { }
