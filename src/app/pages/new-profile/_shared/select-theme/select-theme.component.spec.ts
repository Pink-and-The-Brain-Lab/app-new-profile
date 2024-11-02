import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectThemeComponent } from './select-theme.component';
import { ChooseDarkProfileIllustrationModule } from 'src/app/illustrations/choose-dark-profile-illustration/choose-dark-profile-illustration.module';
import { ChooseNavyProfileIllustrationModule } from 'src/app/illustrations/choose-navy-profile-illustration/choose-navy-profile-illustration.module';
import { ChooseLightProfileIllustrationModule } from 'src/app/illustrations/choose-light-profile-illustration/choose-light-profile-illustration.module';
import { ChoosePurpleProfileIllustrationModule } from 'src/app/illustrations/choose-purple-profile-illustration/choose-purple-profile-illustration.module';
import { ChooseLightPurpleProfileIllustrationModule } from 'src/app/illustrations/choose-light-purple-profile-illustration/choose-light-purple-profile-illustration.module';
import { LoadingButtonModule, SpinnerModule, Theme, ThemeChangerService } from 'millez-web-components/dist/components';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { NgxsModule, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import PROFILE_UPDATE_MOCK from 'src/app/mocks/profile-update-service.test.mock';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SelectThemeComponent', () => {
  let component: SelectThemeComponent;
  let fixture: ComponentFixture<SelectThemeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [SelectThemeComponent],
    imports: [ChooseDarkProfileIllustrationModule,
        ChooseNavyProfileIllustrationModule,
        ChooseLightProfileIllustrationModule,
        ChoosePurpleProfileIllustrationModule,
        ChooseLightPurpleProfileIllustrationModule,
        LoadingButtonModule,
        SpinnerModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        NgxsModule.forRoot([])],
    providers: [
        TranslatePipe,
        { provide: ToastrService, useValue: TOASTR_SERVICE_MOCK },
        { provide: ProfileUpdate, useValue: PROFILE_UPDATE_MOCK },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(SelectThemeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to previous page', () => {
    component.back();
    expect(router.navigate).toHaveBeenCalledWith(['/new-profile/phone-number-validation']);
  });

  it('should set selectedTheme and call loadTheme with correct theme', () => {
    const theme = 'dark' as any;
    const themeChangerService = TestBed.inject(ThemeChangerService);
    const spy = spyOn(themeChangerService, 'loadTheme');
    component.selectTheme(theme);
    expect(spy).toHaveBeenCalled();
  });
  
  it('should save profile data and go to the next page', () => {
    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'selectSnapshot').and.returnValue({});
    const service = TestBed.inject(ProfileUpdate);
    const serviceSpy = spyOn(service, 'update').and.returnValue(of({} as any));
    component.next();
    expect(storeSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalled();
  });
  
  it('should get an error save profile data and go to the next page', () => {
    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'selectSnapshot').and.returnValue({});
    const service = TestBed.inject(ProfileUpdate);
    const serviceSpy = spyOn(service, 'update').and.returnValue(throwError(() => ({error: {message: ''}})));
    component.next();
    expect(storeSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalled();
  });
});
