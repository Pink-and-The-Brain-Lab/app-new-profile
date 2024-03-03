import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChosenProfileNameComponent } from './chosen-profile-name.component';
import { ChosenProfileNameRoutingModule } from './chosen-profile-name-routing';
import { InputValidationModule, LoadingButtonModule, ProfilePreviewModule, SpinnerModule } from 'millez-web-components/dist/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ChosenProfileNameComponent
  ],
  imports: [
    CommonModule,
    ChosenProfileNameRoutingModule,
    ProfilePreviewModule,
    InputValidationModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    LoadingButtonModule,
    TranslateModule.forChild(),
  ],
  providers: [
    TranslatePipe,
  ]
})
export class ChosenProfileNameModule { }
