import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileCustomizeAvatarComponent } from './profile-customize-avatar.component';
import { ChoseImageModule, ColorSelectorModule, CropperModule, LoadingButtonModule, LocalStorageManager, ModalModule, ModalOverlayRef, ModalService, ProfilePreviewModule, SpinnerModule } from 'millez-web-components/dist/components';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { NgxsModule, Store } from '@ngxs/store';
import { OverlayRef, ToastrService } from 'ngx-toastr';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import PROFILE_UPDATE_MOCK from 'src/app/mocks/profile-update-service.test.mock';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { Subject, of, throwError } from 'rxjs';

describe('ProfileCustomizeAvatarComponent', () => {
  let component: ProfileCustomizeAvatarComponent;
  let fixture: ComponentFixture<ProfileCustomizeAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCustomizeAvatarComponent ],
      imports: [
        ProfilePreviewModule,
        ChoseImageModule,
        ColorSelectorModule,
        ModalModule,
        CropperModule,
        SpinnerModule,
        LoadingButtonModule,
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

    fixture = TestBed.createComponent(ProfileCustomizeAvatarComponent);
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
    expect(spy).toHaveBeenCalledWith(['/new-profile/select-theme']);
  });
  
  it('should save profile data and go to the next page', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'selectSnapshot').and.returnValue({});
    const service = TestBed.inject(GenericCRUDService);
    const serviceSpy = spyOn(service, 'genericPost').and.returnValue(of({}));
    component.next();
    expect(spy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalled();
  });
  
  it('should call save data and return undefined profile id from local storage', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'selectSnapshot').and.returnValue({});
    const service = TestBed.inject(GenericCRUDService);
    const serviceSpy = spyOn(service, 'genericPost').and.returnValue(of({}));
    const localStorage = TestBed.inject(LocalStorageManager);
    const spyLocalStroage = spyOn(localStorage, 'get').and.returnValue(undefined);
    component.next();
    expect(spy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalled();
    expect(spyLocalStroage).toHaveBeenCalled();
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

  it('should open a modal', () => {
    const service = TestBed.inject(ModalService);
    const serviceSpy = spyOn(service, 'open');
    const listenModalAcceptSpy = spyOn(component, 'listenModalAccept' as any);
    const listenModalDeclineSpy = spyOn(component, 'listenModalDecline' as any);
    component.showModal();
    expect(serviceSpy).toHaveBeenCalled();
    expect(listenModalAcceptSpy).toHaveBeenCalled();
    expect(listenModalDeclineSpy).toHaveBeenCalled();
  });

  it('should listen accept modal action', () => {
    const mockModalRef: any = { accepted: new Subject<any>() };
    component['listenModalAccept'](mockModalRef);
    mockModalRef.accepted.next('abcd');
    expect(component.image.blobUrl).toBe('abcd');
  });

  it('should listen decline modal action', () => {
    const mockModalRef: any = { declined: new Subject<any>() };
    component.imageFileBackup = 'abcd' as any;
    component['listenModalDecline'](mockModalRef);
    mockModalRef.declined.next();
    expect(component.image).toBe('abcd' as any);
  });

  it('should get loaded image', () => {
    const spy = spyOn(component, 'showModal');
    component.imageLoaded('abcd' as any);
    expect(spy).toHaveBeenCalled();
    expect(component.image).toBe('abcd' as any);
  });
});
