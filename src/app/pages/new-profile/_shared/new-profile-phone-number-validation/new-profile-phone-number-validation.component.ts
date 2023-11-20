import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';
import { UpdateProfileAction } from 'src/app/states/actions/update-profile.action';

@Component({
  selector: 'app-new-profile-phone-number-validation',
  templateUrl: './new-profile-phone-number-validation.component.html',
  styleUrls: ['./new-profile-phone-number-validation.component.scss']
})
export class NewProfilePhoneNumberValidationComponent {

  isPhoneValidated = false;
  isLoading = false;

  constructor(
    private router: Router,
    private store: Store
  ) {}

  back() {
    this.router.navigate(['/new-profile/choose-phone-number']);
  }

  next() {
    const profile = this.store.selectSnapshot(ProfileState);
    const profileUpdated = {
      ...profile,
      phoneNumberValidated: true,
    };
    this.store.dispatch( new UpdateProfileAction(profileUpdated) );
    this.router.navigate(['/new-profile/customize-avatar']);
  }

  validate(code: string) {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.isPhoneValidated = true;
    }, 2000);
  }

}
