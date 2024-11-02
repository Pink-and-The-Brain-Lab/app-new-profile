import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewProfileChoosePhoneNumberComponent } from './new-profile-choose-phone-number.component';
import { LoadingButtonModule, PhoneNumberModule, SpinnerModule } from 'millez-web-components/dist/components';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { NgxsModule, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';
import PROFILE_UPDATE_MOCK from 'src/app/mocks/profile-update-service.test.mock';
import { of, throwError } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NewProfileChoosePhoneNumberComponent', () => {
  let component: NewProfileChoosePhoneNumberComponent;
  let fixture: ComponentFixture<NewProfileChoosePhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [NewProfileChoosePhoneNumberComponent],
    imports: [RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        PhoneNumberModule,
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

    fixture = TestBed.createComponent(NewProfileChoosePhoneNumberComponent);
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
    expect(spy).toHaveBeenCalledWith(['/new-profile/choose-email']);
  });
  
  it('should save profile data and go to the next page', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'selectSnapshot').and.returnValue({ email: '' });
    component.next();
    expect(spy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalled();
  });

  it('should get an error when update profile', () => {
    const service = TestBed.inject(ProfileUpdate);
    const spy = spyOn(service, 'update').and.returnValue(throwError(() => ({error: {message: ''}})));
    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'selectSnapshot').and.returnValue({ email: '' });
    component.next();
    expect(spy).toHaveBeenCalled();
    expect(component.savingData).toBeFalse();
    expect(storeSpy).toHaveBeenCalled();
  });

  it('should check if phone number available', () => {
    const service = TestBed.inject(GenericCRUDService);
    const spy = spyOn(service, 'genericPost').and.returnValue(of({}));
    component.checkIfPhoneIsAvailable('123456');
    expect(spy).toHaveBeenCalled();
    expect(component.isPhoneAvailable).toBeTrue();
    expect(component.isPhoneValidated).toBeTrue();
    expect(component.isLoading).toBeFalse();
  });

  it('should get an error when check if phone number available', () => {
    const service = TestBed.inject(GenericCRUDService);
    const spy = spyOn(service, 'genericPost').and.returnValue(throwError(() => ({error: {message: ''}})));
    component.checkIfPhoneIsAvailable('123456');
    expect(spy).toHaveBeenCalled();
    expect(component.isPhoneAvailable).toBeFalse();
    expect(component.isPhoneValidated).toBeFalse();
    expect(component.isLoading).toBeFalse();
  });
});
