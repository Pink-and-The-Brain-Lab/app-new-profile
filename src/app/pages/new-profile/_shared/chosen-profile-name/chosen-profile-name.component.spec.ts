import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChosenProfileNameComponent } from './chosen-profile-name.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ChosenProfileNameRoutingModule } from './chosen-profile-name-routing';
import { InputValidationModule, LoadingButtonModule, ProfilePreviewModule, SpinnerModule } from 'millez-web-components/dist/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule, Store } from '@ngxs/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';
import { Router } from '@angular/router';
import PROFILE_UPDATE_MOCK from 'src/app/mocks/profile-update-service.test.mock';

describe('ChosenProfileNameComponent', () => {
  let component: ChosenProfileNameComponent;
  let fixture: ComponentFixture<ChosenProfileNameComponent>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GenericCRUDService', ['genericPost']);
    await TestBed.configureTestingModule({
      declarations: [ ChosenProfileNameComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        ChosenProfileNameRoutingModule,
        ProfilePreviewModule,
        InputValidationModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        LoadingButtonModule,
        NoopAnimationsModule,
        NgxsModule.forRoot([])
      ],
      providers: [
        TranslatePipe,
        { provide: ToastrService, useValue: TOASTR_SERVICE_MOCK },
        { provide: GenericCRUDService, useValue: spy },
        { provide: ProfileUpdate, useValue: PROFILE_UPDATE_MOCK },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChosenProfileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen profile state', () => {
    const service = TestBed.inject(Store);
    const spy = spyOn(service, 'select').and.returnValue(of({
      color: '#fff',
      image: 'imageFile',
      userName: 'userName'
  }));
    component['listenProfileState']();
    expect(spy).toHaveBeenCalled();
    expect(component.color).toBe('#fff');
    expect(component.imageFile).toBe('imageFile');
    expect(component.userName).toBe('userName');
  });

  it('should listen profile state and use default values', () => {
    const service = TestBed.inject(Store);
    const spy = spyOn(service, 'select').and.returnValue(of({ image: 'imageFile' }));
    component['listenProfileState']();
    expect(spy).toHaveBeenCalled();
    expect(component.color).toBe('#7A87CC');
    expect(component.imageFile).toBe('imageFile');
    expect(component.userName).toBe('CHOSEN_NAME');
  });

  it('should back to previous page', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.back();
    expect(spy).toHaveBeenCalled();
  });
  
  it('should save profile data and go to the next page', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.next();
    expect(spy).toHaveBeenCalled();
  });

  it('should get an error when update profile', () => {
    const service = TestBed.inject(ProfileUpdate);
    const spy = spyOn(service, 'update').and.returnValue(throwError(() => ({error: {message: ''}})));
    component.next();
    expect(spy).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
  });

  it('should get input changes', () => {
    component.form.patchValue({
      name: 'Name'
    });
    component.name?.valueChanges
      .subscribe(
        response => expect(response).toBe('Name')
      );
  });

  it('should get input changes with default value', () => {
    component.form.patchValue({
      name: ''
    });
    component.name?.valueChanges
      .subscribe(
        response => expect(response).toBe('PROFILE_NAME')
      );
  });
});
