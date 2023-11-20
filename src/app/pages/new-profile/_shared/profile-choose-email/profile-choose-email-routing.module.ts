import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileChooseEmailComponent } from './profile-choose-email.component';

const routes: Routes = [{
  path: '',
  component: ProfileChooseEmailComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileChooseEmailRoutingModule { }
