import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { PhoneNumberModule } from '@app/_cdk/components/phone-number/phone-number.module';
import { NewProfileChoosePhoneNumberComponent } from './new-profile-choose-phone-number.component';

const mockRouter = {
    navigate: jest.fn()
  };

describe('NewProfileChoosePhoneNumberComponent', () => {
  let component: NewProfileChoosePhoneNumberComponent;
  let fixture: ComponentFixture<NewProfileChoosePhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProfileChoosePhoneNumberComponent ],
      imports: [
        PhoneNumberModule,
        BrowserAnimationsModule,
      ],
      providers: [{
        provide: Router,
        useValue: mockRouter
      }]
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
    const spy = jest.spyOn(router, 'navigate');
    component.back();
    expect(spy).toHaveBeenCalledWith(['/new-profile/choose-email']);
  });

  it('should go to next page', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.next();
    expect(spy).toHaveBeenCalledWith(['/new-profile/phone-number-validation']);
  });

  it('should define phone number disposition', () => {
    component.setIfPhoneIsAvailabel(true)
    expect(component.isPhoneAvailable).toBeTruthy();
  });
});
