import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewProfilePhoneNumberValidationComponent } from './new-profile-phone-number-validation.component';
import { CodeValidationModule, LoadingButtonModule, SpinnerModule } from 'millez-web-components/dist/components';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import PROFILE_UPDATE_MOCK from 'src/app/mocks/profile-update-service.test.mock';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NewProfilePhoneNumberValidationComponent', () => {
  let component: NewProfilePhoneNumberValidationComponent;
  let fixture: ComponentFixture<NewProfilePhoneNumberValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [NewProfilePhoneNumberValidationComponent],
    imports: [RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        CodeValidationModule,
        SpinnerModule,
        LoadingButtonModule,
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

    fixture = TestBed.createComponent(NewProfilePhoneNumberValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should back to previous page', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.back();
    expect(spy).toHaveBeenCalledWith(['/new-profile/choose-phone-number']);
  });
  
  it('should save profile data and go to the next page', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'selectSnapshot').and.returnValue({});
    component.next();
    expect(spy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalled();
  });

  it('should get an error when update profile', () => {
    const service = TestBed.inject(ProfileUpdate);
    const spy = spyOn(service, 'update').and.returnValue(throwError(() => ({error: {message: ''}})));
    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'selectSnapshot').and.returnValue({});
    component.next();
    expect(spy).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
    expect(storeSpy).toHaveBeenCalled();
  });

  it('should validate the validation code', () => {
    const service = TestBed.inject(GenericCRUDService);
    const spy = spyOn(service, 'genericPost').and.returnValue(of({}));
    component.validate('1234');
    expect(spy).toHaveBeenCalled();
    expect(component.isPhoneValidated).toBeTrue();
  });

  it('should get an erro when validate code validation', () => {
    const service = TestBed.inject(GenericCRUDService);
    const spy = spyOn(service, 'genericPost').and.returnValue(throwError(() => ({error: {message: ''}})));
    component.validate('1234');
    expect(spy).toHaveBeenCalled();
    expect(component.isPhoneValidated).toBeFalse();
    expect(component.isLoading).toBeFalse();
  });
});
