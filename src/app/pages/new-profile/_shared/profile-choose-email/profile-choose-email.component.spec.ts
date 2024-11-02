import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileChooseEmailComponent } from './profile-choose-email.component';
import { InputValidationModule, LoadingButtonModule, SpinnerModule } from 'millez-web-components/dist/components';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import PROFILE_UPDATE_MOCK from 'src/app/mocks/profile-update-service.test.mock';
import { debounceTime, of, throwError } from 'rxjs';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { Router } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProfileChooseEmailComponent', () => {
  let component: ProfileChooseEmailComponent;
  let fixture: ComponentFixture<ProfileChooseEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ProfileChooseEmailComponent],
    imports: [InputValidationModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingButtonModule,
        SpinnerModule,
        BrowserModule,
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

    fixture = TestBed.createComponent(ProfileChooseEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.canUseEmail).toBeFalsy();
    expect(component.allTestedEmails.length).toEqual(0);
    expect(component.isLoading).toBeFalsy();
  });

  it('should get email', () => {
    component.form.patchValue({ email: 'email@mail.com' });
    expect(component.email?.value).toBe('email@mail.com');
  });

  it('should check if email was validated', () => {
    component.allTestedEmails.push('email@mail.com');
    component.form.patchValue({ email: 'email@mail.com' });
    component.email?.valueChanges
        .pipe(debounceTime(300))
        .subscribe(() => expect(component.canUseEmail).toBeTruthy());
  });

  it('should check if email was validated with a validated email', () => {
    component.allTestedEmails.push('email@mail.com');
    component.availableEmails.push('email@mail.com');
    component.form.patchValue({ email: 'email@mail.com' });
    component.email?.valueChanges
        .pipe(debounceTime(300))
        .subscribe(() => expect(component.canUseEmail).toBeTruthy());
  });
  
  it('should validate an email', () => {
    const service = TestBed.inject(GenericCRUDService);
    const spy = spyOn(service, 'genericPost').and.returnValue(of({}));
    component.form.patchValue({ email: 'email@mail.com' });
    component.validateEmail();
    expect(spy).toHaveBeenCalled();
    expect(component.canUseEmail).toBeTrue();
    expect(component.hasEmailChecked).toBeTrue();
    expect(component.availableEmails.length).toBe(1);
    expect(component.allTestedEmails.length).toBe(1);
  });
  
  it('should validate an email', () => {
    const service = TestBed.inject(GenericCRUDService);
    const spy = spyOn(service, 'genericPost').and.returnValue(throwError(() => ({error: {message: ''}})));
    component.form.patchValue({ email: 'email@mail.com' });
    component.validateEmail();
    expect(spy).toHaveBeenCalled();
    expect(component.canUseEmail).toBeFalse();
  });
  
  it('should save profile data and go to the next page', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'selectSnapshot').and.returnValue({});
    const service = TestBed.inject(GenericCRUDService);
    const serviceSpy = spyOn(service, 'genericPost').and.returnValue(of({ profileId: '123' }));
    component.next();
    expect(spy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalled();
  });
  
  it('should get an error save profile data and go to the next page', () => {
    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'selectSnapshot').and.returnValue({});
    const service = TestBed.inject(GenericCRUDService);
    const serviceSpy = spyOn(service, 'genericPost').and.returnValue(throwError(() => ({error: {message: ''}})));
    component.next();
    expect(storeSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalled();
  });
});
