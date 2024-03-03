import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvideYourChosenNameComponent } from './provide-your-chosen-name.component';
import { ProvideYourChosenNameRoutingModule } from './provide-your-chosen-name-routing';
import { InputValidationModule, LoadingButtonModule, ProfilePreviewModule, SpinnerModule } from 'millez-web-components/dist/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProvideYourChosenNameComponent
  ],
  imports: [
    CommonModule,
    ProvideYourChosenNameRoutingModule,
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
export class ProvideYourChosenNameModule { }
