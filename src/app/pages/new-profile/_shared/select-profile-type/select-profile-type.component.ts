import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';
import { UpdateProfileAction } from 'src/app/states/actions/update-profile.action';
import { Subject, takeUntil } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileType } from './models/profile-type.interface';

@Component({
  selector: 'app-select-profile-type',
  templateUrl: './select-profile-type.component.html',
  styleUrls: ['./select-profile-type.component.scss']
})
export class SelectProfileTypeComponent implements OnDestroy, OnInit {

  private destroy$ = new Subject<boolean>();
  color = '#7A87CC';
  imageFile = '';
  userName = 'Chosen Name';
  profileName = 'profile name';
  isLoading = false;
  profileOptions: ProfileType[] = [{
    value: 'Private',
    label: 'Private',
  }, {
    value: 'Public',
    label: 'Public',
  }];
  selectedOption = this.profileOptions[1];

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
    

    // TODO - fazer a chamada da API para salvar os dados do profile
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  private listenInputChanges() {
    this.form.get('name')?.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(response => this.profileName = response?.trim() || 'profile name')
  }

  getSelectedPropfileOption(value: ProfileType) {
    console.log(value);
  }

  get name(): AbstractControl | null {
    return this.form.get('name');
  }
}
