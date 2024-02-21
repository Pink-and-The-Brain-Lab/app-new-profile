import { Component, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';
import { UpdateProfileAction } from 'src/app/states/actions/update-profile.action';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { Subject, takeUntil } from 'rxjs';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { IValidateCode } from './models/validate-code.interface';
import { IValidateCodeResponse } from './models/validate-code-response.interface';
import { API_PATH } from 'src/app/constants/api-path';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';

@Component({
  selector: 'app-new-profile-phone-number-validation',
  templateUrl: './new-profile-phone-number-validation.component.html',
  styleUrls: ['./new-profile-phone-number-validation.component.scss']
})
export class NewProfilePhoneNumberValidationComponent extends HandleError implements OnDestroy {

  private destroy$ = new Subject<boolean>();
  private readonly genericCRUDService = inject(GenericCRUDService);
  private readonly profileUpdate = inject(ProfileUpdate);
  isPhoneValidated = false;
  savingData = false;

  constructor(
    private router: Router,
    private store: Store
  ) {
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
    const profile = this.store.selectSnapshot(ProfileState);
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
          this.router.navigate(['/new-profile/customize-avatar']);
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
        next: () => {
          this.isPhoneValidated = true;
          
        },
        error: _error => {
          super.handleError(_error);
          this.isPhoneValidated = false;
        },
        complete: () => this.isLoading = false,
      });
  }

}
