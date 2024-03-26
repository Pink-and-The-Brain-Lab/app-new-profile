import { Component, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { Subject, takeUntil } from 'rxjs';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { IValidateCode } from './models/validate-code.interface';
import { IValidateCodeResponse } from './models/validate-code-response.interface';
import { API_PATH } from 'src/app/constants/api-path';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';
import { UpdateProfileAction, UpdateProfileState } from 'millez-web-components/dist/components';

@Component({
  selector: 'app-new-profile-phone-number-validation',
  templateUrl: './new-profile-phone-number-validation.component.html',
  styleUrls: ['./new-profile-phone-number-validation.component.scss']
})
export class NewProfilePhoneNumberValidationComponent extends HandleError implements OnDestroy {

  private destroy$ = new Subject<boolean>();
  private readonly genericCRUDService = inject(GenericCRUDService);
  private readonly profileUpdate = inject(ProfileUpdate);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  isPhoneValidated = false;
  savingData = false;

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  back() {
    this.router.navigate(['/new-profile/choose-phone-number']);
  }

  next() {
    this.savingData = true;
    const profile = this.store.selectSnapshot(UpdateProfileState);
    const profileUpdated = {
      ...profile,
      phoneNumberValidated: this.isPhoneValidated,
    };
    
    this.profileUpdate.update({ validated: this.isPhoneValidated })
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: _response => {
          this.store.dispatch( new UpdateProfileAction(profileUpdated) );
          this.router.navigate(['/new-profile/select-theme']);
        },
        error: _error => super.handleError(_error),
        complete: () => this.savingData = false,
      });
  }

  validate(code: string) {
    this.isLoading = true;
    const data = { token: code };
    this.genericCRUDService.genericPost<IValidateCodeResponse, IValidateCode>(API_PATH.tokenValidation, data)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => this.isPhoneValidated = true,
        error: _error => {
          super.handleError(_error);
          this.isPhoneValidated = false;
        },
        complete: () => this.isLoading = false,
      });
  }

}
