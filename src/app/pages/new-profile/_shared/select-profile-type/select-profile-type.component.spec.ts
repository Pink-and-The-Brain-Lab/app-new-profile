import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectProfileTypeComponent } from './select-profile-type.component';
import { CustomSelectModule, LoadingButtonModule, ProfilePreviewModule, SpinnerModule } from 'millez-web-components/dist/components';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { NgxsModule, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import PROFILE_UPDATE_MOCK from 'src/app/mocks/profile-update-service.test.mock';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('SelectProfileTypeComponent', () => {
  let component: SelectProfileTypeComponent;
  let fixture: ComponentFixture<SelectProfileTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProfileTypeComponent ],
      imports: [
        ProfilePreviewModule,
        CustomSelectModule,
        LoadingButtonModule,
        SpinnerModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        NgxsModule.forRoot([]),
      ],
      providers: [
        TranslatePipe,
        { provide: ToastrService, useValue: TOASTR_SERVICE_MOCK },
        { provide: ProfileUpdate, useValue: PROFILE_UPDATE_MOCK },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProfileTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen update profile state', () => {
    const store = TestBed.inject(Store);
    const spy = spyOn(store, 'select').and.returnValue(of({ image: 'abcd' }));
    component['listenProfileState']();
    expect(component.color).toBe('#7A87CC');
    expect(component.imageFile).toBe('abcd');
    expect(component.userName).toBe('CHOSEN_NAME');
    expect(component.profileName).toBe('PROFILE_NAME');
    expect(spy).toHaveBeenCalled();
  });

  it('should back to previous page', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.back();
    expect(spy).toHaveBeenCalledWith(['/new-profile/chosen-profile-name']);
  });
  
  it('should save profile data and go to the next page', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'selectSnapshot').and.returnValue({});
    const service = TestBed.inject(ProfileUpdate);
    const serviceSpy = spyOn(service, 'update').and.returnValue(of({} as any));
    component.next();
    expect(spy).toHaveBeenCalled();
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

  it('should get selected profile option', () => {
    component.getSelectedPropfileOption('abcd' as any);
    expect(component.selectedOption).toBe('abcd' as any);
  });
});
