import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectThemeComponent } from './select-theme.component';
import { ChooseDarkProfileIllustrationModule } from 'src/app/illustrations/choose-dark-profile-illustration/choose-dark-profile-illustration.module';
import { ChooseNavyProfileIllustrationModule } from 'src/app/illustrations/choose-navy-profile-illustration/choose-navy-profile-illustration.module';
import { ChooseLightProfileIllustrationModule } from 'src/app/illustrations/choose-light-profile-illustration/choose-light-profile-illustration.module';
import { ChoosePurpleProfileIllustrationModule } from 'src/app/illustrations/choose-purple-profile-illustration/choose-purple-profile-illustration.module';
import { ChooseLightPurpleProfileIllustrationModule } from 'src/app/illustrations/choose-light-purple-profile-illustration/choose-light-purple-profile-illustration.module';
import { LoadingButtonModule, SpinnerModule } from 'millez-web-components/dist/components';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { ProfileUpdate } from 'src/app/commons/services/profile-update.service';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import PROFILE_UPDATE_MOCK from 'src/app/mocks/profile-update-service.test.mock';

describe('SelectThemeComponent', () => {
  let component: SelectThemeComponent;
  let fixture: ComponentFixture<SelectThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectThemeComponent ],
      imports: [
        ChooseDarkProfileIllustrationModule,
        ChooseNavyProfileIllustrationModule,
        ChooseLightProfileIllustrationModule,
        ChoosePurpleProfileIllustrationModule,
        ChooseLightPurpleProfileIllustrationModule,
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

    fixture = TestBed.createComponent(SelectThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
