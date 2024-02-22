import { Component, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { IDefaultResponse } from 'src/app/commons/models/default-response.interface';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { UpdateProfileAction } from 'src/app/states/actions/update-profile.action';
import { ProfileState } from 'src/app/states/state/profile.state';
import { IValidatePhoneNumber } from '../profile-choose-email/models/validate-phone-number.interface';
import { API_PATH } from 'src/app/constants/api-path';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';

@Component({
  selector: 'app-new-profile-choose-phone-number',
  templateUrl: './new-profile-choose-phone-number.component.html',
  styleUrls: ['./new-profile-choose-phone-number.component.scss']
})
export class NewProfileChoosePhoneNumberComponent extends HandleError implements OnDestroy {

  private destroy$ = new Subject<boolean>();
  private readonly genericCRUDService = inject(GenericCRUDService);
  private readonly profileUpdate = inject(ProfileUpdate);
  isPhoneAvailable = false;
  isPhoneValidated = false;
  savingData = false;
  phoneNumber = '';

  constructor(
    private router: Router,
    private store: Store
  ) {
    super();
  }

  /**
   * TODO need to create selecte theme page after validate phone number page,
   * also need to changes te system theme when the theme option changes
   */

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  back() {
    this.router.navigate(['/new-profile/choose-email']);
  }

  next() {
    this.savingData = true;
    const profile = this.store.selectSnapshot(ProfileState);
    const profileUpdated = {
      ...profile,
      phoneNumber: this.phoneNumber,
    };
    
    this.profileUpdate.update({ phoneNumber: this.phoneNumber, email: profile.email })
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.store.dispatch( new UpdateProfileAction(profileUpdated) );
          this.router.navigate(['/new-profile/phone-number-validation']);
        },
        error: _error => {
          super.handleError(_error);
          this.savingData = false;
        },
      });
  }

  setIfPhoneIsAvailabel(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
    this.isLoading = true;
    const data = { phoneNumber: this.phoneNumber }
    this.genericCRUDService.genericPost<IDefaultResponse, IValidatePhoneNumber>(API_PATH.checkPhoneNumberDisponibility, data)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.isPhoneAvailable = true;
          this.isPhoneValidated = true;
          
        },
        error: _error => {
          super.handleError(_error);
          this.isPhoneAvailable = false;
          this.isPhoneValidated = false;
        },
        complete: () => this.isLoading = false,
      });
  }

}
