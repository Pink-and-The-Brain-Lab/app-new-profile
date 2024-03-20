import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewProfileComponent } from './new-profile.component';
import { LogoModule } from 'millez-web-components/dist/components';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { NgxsModule, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import PROFILE_UPDATE_MOCK from 'src/app/mocks/profile-update-service.test.mock';
import { Router } from '@angular/router';

describe('NewProfileComponent', () => {
  let component: NewProfileComponent;
  let fixture: ComponentFixture<NewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProfileComponent ],
      imports: [
        LogoModule,
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

    fixture = TestBed.createComponent(NewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the profile configuration', () => {
    const router = TestBed.inject(Router);
    const routerSpy = spyOn(router, 'navigate');
    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'dispatch');
    component.close();
    expect(routerSpy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalled();
  });
});
