import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChosenProfileNameComponent } from './chosen-profile-name.component';

const routes: Routes = [{
  path: '',
  component: ChosenProfileNameComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChosenProfileNameRoutingModule { }
