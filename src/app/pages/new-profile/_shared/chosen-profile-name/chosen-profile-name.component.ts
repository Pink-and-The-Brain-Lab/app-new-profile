import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';
import { UpdateProfileAction } from 'src/app/states/actions/update-profile.action';
import { Subject, takeUntil } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chosen-profile-name',
  templateUrl: './chosen-profile-name.component.html',
  styleUrls: ['./chosen-profile-name.component.scss']
})
export class ChosenProfileNameComponent implements OnDestroy, OnInit {

  private destroy$ = new Subject<boolean>();
  color = '#7A87CC';
  imageFile = '';
  userName = 'Chosen Name';
  profileName = 'profile name';

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(
    private router: Router,
    private store: Store
  ) {}

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
    this.store.dispatch( new UpdateProfileAction(profileUpdated) );
    this.router.navigate(['/new-profile/select-profile-type']);
  }

  private listenInputChanges() {
    this.form.get('name')?.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(response => this.profileName = response?.trim() || 'profile name')
  }

  get name(): AbstractControl | null {
    return this.form.get('name');
  }

}
