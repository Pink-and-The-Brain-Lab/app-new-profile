import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UpdateProfileAction } from 'src/app/states/actions/update-profile.action';
import { ProfileState } from 'src/app/states/state/profile.state';

@Component({
  selector: 'app-new-profile-choose-phone-number',
  templateUrl: './new-profile-choose-phone-number.component.html',
  styleUrls: ['./new-profile-choose-phone-number.component.scss']
})
export class NewProfileChoosePhoneNumberComponent {

  // TODO - precisa altrerar o cdk-phone-number pra retornar tbm o numero do telefone

  isPhoneAvailable = false;
  phoneNumber = '';

  constructor(
    private router: Router,
    private store: Store
  ) {}

  back() {
    this.router.navigate(['/new-profile/choose-email']);
  }

  next() {
    const profile = this.store.selectSnapshot(ProfileState);
    const profileUpdated = {
      ...profile,
      phoneNumber: this.phoneNumber,
    };
    this.store.dispatch( new UpdateProfileAction(profileUpdated) );
    this.router.navigate(['/new-profile/phone-number-validation']);
  }

  setIfPhoneIsAvailabel(event: boolean) {
    this.isPhoneAvailable = event;
  }

}
