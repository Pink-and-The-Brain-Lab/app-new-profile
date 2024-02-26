import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProfileComponent } from './new-profile.component';

const routes: Routes = [{
  path: '',
  component: NewProfileComponent,
  loadChildren: () => import('./_shared/profile-type/profile-type.module').then(m => m.ProfileTypeModule)
}, {
  path: 'choose-email',
  component: NewProfileComponent,
  loadChildren: () => import('./_shared/profile-choose-email/profile-choose-email.module').then(m => m.ProfileChooseEmailModule)
}, {
  path: 'choose-phone-number',
  component: NewProfileComponent,
  loadChildren: () => import('./_shared/new-profile-choose-phone-number/new-profile-choose-phone-number.module').then(m => m.NewProfileChoosePhoneNumberModule)
}, {
  path: 'phone-number-validation',
  component: NewProfileComponent,
  loadChildren: () => import('./_shared/new-profile-phone-number-validation/new-profile-phone-number-validation.module').then(m => m.NewProfilePhoneNumberValidationModule)
}, {
  path: 'customize-avatar',
  component: NewProfileComponent,
  loadChildren: () => import('./_shared/profile-customize-avatar/profile-customize-avatar.module').then(m => m.ProfileCustomizeAvatarModule)
}, {
  path: 'provide-chosen-name',
  component: NewProfileComponent,
  loadChildren: () => import('./_shared/provide-your-chosen-name/provide-your-chosen-name.module').then(m => m.ProvideYourChosenNameModule)
}, {
  path: 'chosen-profile-name',
  component: NewProfileComponent,
  loadChildren: () => import('./_shared/chosen-profile-name/chosen-profile-name.module').then(m => m.ChosenProfileNameModule)
}, {
  path: 'select-profile-type',
  component: NewProfileComponent,
  loadChildren: () => import('./_shared/select-profile-type/select-profile-type.module').then(m => m.SelectProfileTypeModule)
}, {
  path: 'select-theme',
  component: NewProfileComponent,
  loadChildren: () => import('./_shared/select-theme/select-theme.module').then(m => m.SelectThemeModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewProfileRoutingModule { }
