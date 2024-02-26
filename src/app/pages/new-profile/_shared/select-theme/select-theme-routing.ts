import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectThemeComponent } from './select-theme.component';

const routes: Routes = [{
  path: '',
  component: SelectThemeComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectThemeRoutingModule { }
