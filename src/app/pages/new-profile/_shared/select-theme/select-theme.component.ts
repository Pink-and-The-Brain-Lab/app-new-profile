import { Component, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Theme, ThemeChangerService, UpdateProfileAction, UpdateProfileState } from 'millez-web-components/dist/components';
import { Subject, takeUntil } from 'rxjs';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';

type keyOfTheme = keyof typeof Theme;

@Component({
  selector: 'app-select-theme',
  templateUrl: './select-theme.component.html',
  styleUrls: ['./select-theme.component.scss']
})
export class SelectThemeComponent extends HandleError implements OnDestroy {

  private destroy$ = new Subject<boolean>();
  private readonly profileUpdate = inject(ProfileUpdate);
  private readonly themeChangerService = inject(ThemeChangerService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  selectedTheme = Theme.DARK;
  themeMap = {
    dark: Theme.DARK,
    navy: Theme.NAVY,
    light: Theme.LIGHT,
  }

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  back() {
    this.router.navigate(['/new-profile/phone-number-validation']);
  }

  selectTheme(theme: keyOfTheme) {
    this.selectedTheme = Theme[theme];
    this.themeChangerService.loadTheme(Theme[theme]);
  }

  next() {
    this.isLoading = true;
    const profile = this.store.selectSnapshot(UpdateProfileState);
    const profileUpdated = {
      ...profile,
      theme: this.selectedTheme,
    };
    
    this.profileUpdate.update({ profileTheme: this.selectedTheme })
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.store.dispatch( new UpdateProfileAction(profileUpdated) );
          this.router.navigate(['/new-profile/customize-avatar']);
        },
        error: _error => {
          super.handleError(_error);
          this.isLoading = false;
        },
        complete: () => this.isLoading = false,
      });
  }

}
