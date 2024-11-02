import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileTypeRoutingModule } from './profile-type-routing.module';
import { ProfileTypeComponent } from './profile-type.component';
import { ProfileTypeBoxModule } from 'src/app/components/profile-type-box/profile-type-box.module';
import { CreateNewProfileIllustrationModule } from 'src/app/illustrations/create-new-profile-illustration/create-new-profile-illustration.module';
import { CreateNewOrganizationIllustrationModule } from 'src/app/illustrations/create-new-organization-illustration/create-new-organization-illustration.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import PROFILE_UPDATE_MOCK from 'src/app/mocks/profile-update-service.test.mock';
import { Router } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProfileTypeComponent', () => {
  let component: ProfileTypeComponent;
  let fixture: ComponentFixture<ProfileTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ProfileTypeComponent],
    imports: [ProfileTypeRoutingModule,
        ProfileTypeBoxModule,
        CreateNewProfileIllustrationModule,
        CreateNewOrganizationIllustrationModule,
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

    fixture = TestBed.createComponent(ProfileTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.routeToNewProfile).toBe('/new-profile/choose-email');
    expect(component.routeToNewOrganization).toBe('');
  });

  it('should navigate to choose email', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.navigateTo('route');
    expect(spy).toHaveBeenCalledWith(['route']);
  });
});
