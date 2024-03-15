import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { ProfileType } from './models/profile-type.interface';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';
import { DashboardVisualizationControlAction, UpdateProfileAction, UpdateProfileState } from 'millez-web-components/dist/components';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-select-profile-type',
  templateUrl: './select-profile-type.component.html',
  styleUrls: ['./select-profile-type.component.scss']
})
export class SelectProfileTypeComponent extends HandleError implements OnDestroy, OnInit {

  private destroy$ = new Subject<boolean>();
  private readonly profileUpdate = inject(ProfileUpdate);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly translatePipe = inject(TranslatePipe);
  color = '#7A87CC';
  imageFile = '';
  userName = this.translatePipe.transform('CHOSEN_NAME');
  profileName = this.translatePipe.transform('PROFILE_NAME');
  profileOptions: ProfileType[] = [{
    value: 'Private',
    label: this.translatePipe.transform('PRIVATE'),
  }, {
    value: 'Public',
    label: this.translatePipe.transform('PUBLIC'),
  }];
  selectedOption = this.profileOptions[1];

  constructor() {
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
    this.store.select(UpdateProfileState.profile)
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
    const profile = this.store.selectSnapshot(UpdateProfileState);
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
          this.store.dispatch( new DashboardVisualizationControlAction({ showDashboard: true }) );
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
