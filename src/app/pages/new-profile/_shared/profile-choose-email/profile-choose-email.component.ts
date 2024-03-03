import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';
import { UpdateProfileAction } from 'src/app/states/actions/update-profile.action';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { IDefaultResponse } from 'src/app/commons/models/default-response.interface';
import { IValidateEmail } from './models/validate-email.interface';
import { API_PATH } from 'src/app/constants/api-path';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { LocalStorageManager, Storage } from 'millez-web-components/dist/components';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-choose-email',
  templateUrl: './profile-choose-email.component.html',
  styleUrls: ['./profile-choose-email.component.scss']
})
export class ProfileChooseEmailComponent extends HandleError implements OnInit, OnDestroy {

  private destroy$ = new Subject<boolean>();
  private readonly genericCRUDService = inject(GenericCRUDService);
  private readonly localStorageManager = inject(LocalStorageManager);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly translatePipe = inject(TranslatePipe);
  canUseEmail = false;
  savingData = false;
  hasEmailChecked = false;
  availableEmails: string[] = [];
  allTestedEmails: string[] = [];
  emailValidationMessage = this.translatePipe.transform('EMAIL_IS_INVALID');

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.email?.valueChanges
    .pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(
      () => this.checkEmail()
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  checkEmail() {
    this.emailValidationMessage = 'Email is invalid';
    if (this.allTestedEmails.includes(this.email?.value)) {
      this.hasEmailChecked = true;
      if (this.availableEmails.includes(this.email?.value)) this.canUseEmail = true;
      else {
        this.canUseEmail = false;
        this.setFormError();
      }
      return;
    }
    
    this.canUseEmail = false;
    this.hasEmailChecked = false;
  }

  setFormError() {
    this.email?.setErrors({ email: true });
    this.emailValidationMessage = this.translatePipe.transform('EMAIL_UNAVAILABLE');
  }

  validateEmail() {
    this.isLoading = true;
    const data = { email: this.email?.value }
    this.genericCRUDService.genericPost<IDefaultResponse, IValidateEmail>(API_PATH.checkEmailDisponibility, data)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.canUseEmail = true;
          this.availableEmails.push(this.email?.value);
        },
        error: _error => {
          super.handleError(_error);
          this.canUseEmail = false;
        },
        complete: () => {
          this.isLoading = false;
          this.allTestedEmails.push(this.email?.value);
          this.hasEmailChecked = true;
        },
      });
  }

  next() {
    this.savingData = true;
    const profile = this.store.selectSnapshot(ProfileState);
    const profileUpdated = {
      ...profile,
      email: this.email?.value,
    };
    this.genericCRUDService.genericPost<IDefaultResponse, IValidateEmail>(API_PATH.createProfile, { email: this.email?.value })
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: _response => {
          this.localStorageManager.set<string>(Storage.PROFILE_ID, _response.profileId);
          this.store.dispatch( new UpdateProfileAction(profileUpdated) );
          this.router.navigate(['/new-profile/choose-phone-number']);
        },
        error: _error => {
          super.handleError(_error);
          this.savingData = false;
        },
      });
  }

}
