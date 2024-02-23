import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';
import { UpdateProfileAction } from 'src/app/states/actions/update-profile.action';
import { Subject, takeUntil } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';

@Component({
  selector: 'app-provide-your-chosen-name',
  templateUrl: './provide-your-chosen-name.component.html',
  styleUrls: ['./provide-your-chosen-name.component.scss']
})
export class ProvideYourChosenNameComponent extends HandleError implements OnDestroy, OnInit {

  private destroy$ = new Subject<boolean>();
  private readonly profileUpdate = inject(ProfileUpdate);
  color = '#7A87CC';
  imageFile = '';
  userName = 'Chosen Name';

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(
    private router: Router,
    private store: Store
  ) {
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
        }
      );
  }

  back() {
    this.router.navigate(['/new-profile/customize-avatar']);
  }

  next() {
    const profile = this.store.selectSnapshot(ProfileState);
    const profileUpdated = {
      ...profile,
      userName: this.name?.value,
    };

    this.profileUpdate.update({ chosenName: this.name?.value })
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.store.dispatch( new UpdateProfileAction(profileUpdated) );
          this.router.navigate(['/new-profile/chosen-profile-name']);
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
      .subscribe(response => this.userName = response?.trim() || 'Chosen Name')
  }

  get name(): AbstractControl | null {
    return this.form.get('name');
  }

}
