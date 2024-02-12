import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { ProfileChooseEmailComponent } from './profile-choose-email.component';
import { InputValidationModule, LoadingButtonModule, SpinnerModule } from 'millez-web-components/dist/components';

const mockRouter = {
  navigate: jest.fn()
};

describe('ProfileChooseEmailComponent', () => {
  let component: ProfileChooseEmailComponent;
  let fixture: ComponentFixture<ProfileChooseEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileChooseEmailComponent ],
      imports: [
        InputValidationModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingButtonModule,
        SpinnerModule,
        BrowserModule,
        NoopAnimationsModule,
      ],
      providers: [{
        provide: Router,
        useValue: mockRouter
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileChooseEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.canUseEmail).toBeFalsy();
    expect(component.allTestedEmails.length).toEqual(0);
    expect(component.isLoading).toBeFalsy();
  });

  it('should get email', () => {
    component.form.patchValue({ email: 'email@mail.com' });
    expect(component.email?.value).toBe('email@mail.com');
  });

  it('should check if email was validated', () => {
    component.allTestedEmails.push('email@mail.com');
    component.form.patchValue({ email: 'email@mail.com' });

    component.email?.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(
      () => expect(component.canUseEmail).toBeTruthy()
    );
  });

  it('should validate email', () => {
    jest.useFakeTimers();
    component.validateEmail();
    jest.advanceTimersByTime(3000);
    expect(component.canUseEmail).toBeTruthy();
  });

  it('should go to next route', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.next();
    expect(spy).toBeCalledWith(['/new-profile/choose-phone-number']);
  });
});
