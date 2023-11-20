import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectProfileTypeComponent } from './select-profile-type.component';

const routes: Routes = [{
  path: '',
  component: SelectProfileTypeComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectProfileTypeRoutingModule { }
