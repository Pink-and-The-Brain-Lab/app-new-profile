import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';
import { UpdateProfileAction } from 'src/app/states/actions/update-profile.action';
import { Subject, takeUntil } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-chosen-profile-name',
  templateUrl: './chosen-profile-name.component.html',
  styleUrls: ['./chosen-profile-name.component.scss']
})
export class ChosenProfileNameComponent extends HandleError implements OnDestroy, OnInit {

  private destroy$ = new Subject<boolean>();
  private readonly profileUpdate = inject(ProfileUpdate);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly translatePipe = inject(TranslatePipe);
  color = '#7A87CC';
  imageFile = '';
  userName = this.translatePipe.transform('CHOSEN_NAME');
  profileName = this.translatePipe.transform('PROFILE_NAME');

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.listenProfileState();
    this.listenInputChanges();
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
        }
      );
  }

  back() {
    this.router.navigate(['/new-profile/provide-chosen-name']);
  }

  next() {
    const profile = this.store.selectSnapshot(ProfileState);
    const profileUpdated = {
      ...profile,
      profileName: this.name?.value,
    };

    
    
    this.profileUpdate.update({ profileName: this.name?.value })
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.store.dispatch( new UpdateProfileAction(profileUpdated) );
          this.router.navigate(['/new-profile/select-profile-type']);
        },
        error: _error => {
          super.handleError(_error);
          this.isLoading = false;
        },
      });
  }

  private listenInputChanges() {
    this.form.get('name')?.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(response => this.profileName = response?.trim() || this.translatePipe.transform('PROFILE_NAME'))
  }

  get name(): AbstractControl | null {
    return this.form.get('name');
  }

}
