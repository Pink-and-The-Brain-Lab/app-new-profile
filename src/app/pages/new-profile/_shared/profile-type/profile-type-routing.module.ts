import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileTypeComponent } from './profile-type.component';

const routes: Routes = [{
  path: '',
  component: ProfileTypeComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileTypeRoutingModule { }
