import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvideYourChosenNameComponent } from './provide-your-chosen-name.component';

const routes: Routes = [{
  path: '',
  component: ProvideYourChosenNameComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvideYourChosenNameRoutingModule { }
