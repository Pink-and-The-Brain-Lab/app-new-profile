import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProfileTypeBoxModule } from '../profile-type-box/profile-type-box.module';
import { ProfileTypeRoutingModule } from './profile-type-routing.module';
import { ProfileTypeComponent } from './profile-type.component';
import { CreateNewProfileIllustrationModule } from 'src/app/illustrations/create-new-profile-illustration/create-new-profile-illustration.module';
import { CreateNewOrganizationIllustrationModule } from 'src/app/illustrations/create-new-organization-illustration/create-new-organization-illustration.module';

const mockRouter = {
  navigate: jest.fn()
};

describe('ProfileTypeComponent', () => {
  let component: ProfileTypeComponent;
  let fixture: ComponentFixture<ProfileTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileTypeComponent ],
      imports: [
        ProfileTypeRoutingModule,
        ProfileTypeBoxModule,
        CreateNewProfileIllustrationModule,
        CreateNewOrganizationIllustrationModule,
      ],
      providers: [{
        provide: Router,
        useValue: mockRouter
      }]
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
    const spy = jest.spyOn(router, 'navigate');
    component.navigateTo('route');
    expect(spy).toHaveBeenCalledWith(['route']);
  });
});
