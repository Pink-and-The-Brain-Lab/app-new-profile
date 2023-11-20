import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { CodeValidationModule } from '@app/_cdk/components/code-validation/code-validation.module';
import { NewProfilePhoneNumberValidationComponent } from './new-profile-phone-number-validation.component';

const mockRouter = {
  navigate: jest.fn()
};

describe('NewProfilePhoneNumberValidationComponent', () => {
  let component: NewProfilePhoneNumberValidationComponent;
  let fixture: ComponentFixture<NewProfilePhoneNumberValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProfilePhoneNumberValidationComponent ],
      imports: [
        CodeValidationModule,
        BrowserAnimationsModule,
      ],
      providers: [{
        provide: Router,
        useValue: mockRouter
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProfilePhoneNumberValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should back to previous route', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.back();
    expect(spy).toBeCalledWith(['/new-profile/choose-phone-number']);
  });
});
