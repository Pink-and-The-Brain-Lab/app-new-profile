import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';
import { UpdateProfileAction } from 'src/app/states/actions/update-profile.action';
import { Subject, takeUntil } from 'rxjs';
import { ProfileType } from './models/profile-type.interface';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';

@Component({
  selector: 'app-select-profile-type',
  templateUrl: './select-profile-type.component.html',
  styleUrls: ['./select-profile-type.component.scss']
})
export class SelectProfileTypeComponent extends HandleError implements OnDestroy, OnInit {

  private destroy$ = new Subject<boolean>();
  private readonly profileUpdate = inject(ProfileUpdate);
  color = '#7A87CC';
  imageFile = '';
  userName = 'Chosen Name';
  profileName = 'profile name';
  profileOptions: ProfileType[] = [{
    value: 'Private',
    label: 'Private',
  }, {
    value: 'Public',
    label: 'Public',
  }];
  selectedOption = this.profileOptions[1];

  constructor(
    private router: Router,
    private store: Store
    ) {
      super();
    }

  ngOnInit(): void {
    this.listenProfileState();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private listenProfileState() {
    this.store.select(ProfileState.profile)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        response => {
          this.color = response.color || this.color;
          this.imageFile = response.image;
          this.userName = response.userName || this.userName;
          this.profileName = response.profileName || this.profileName;
        }
      );
  }

  back() {
    this.router.navigate(['/new-profile/chosen-profile-name']);
  }

  next() {
    this.isLoading = true;
    const profile = this.store.selectSnapshot(ProfileState);
    const profileUpdated = {
      ...profile,
      profileType: this.selectedOption.value,
    };
    this.store.dispatch( new UpdateProfileAction(profileUpdated) );
    
    this.profileUpdate.update({ profileVisibility: this.selectedOption.value })
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.store.dispatch( new UpdateProfileAction(profileUpdated) );
          this.router.navigate(['/']);
        },
        error: _error => {
          super.handleError(_error);
          this.isLoading = false;
        },
      });
  }

  getSelectedPropfileOption(value: ProfileType) {
    this.selectedOption = value;
  }
}
