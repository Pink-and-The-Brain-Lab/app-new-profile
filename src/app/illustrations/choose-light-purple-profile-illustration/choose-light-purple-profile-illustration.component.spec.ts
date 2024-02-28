import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChooseLightPurpleProfileIllustrationComponent } from './choose-light-purple-profile-illustration.component';

describe('ChooseLightPurpleProfileIllustrationComponent', () => {
  let component: ChooseLightPurpleProfileIllustrationComponent;
  let fixture: ComponentFixture<ChooseLightPurpleProfileIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseLightPurpleProfileIllustrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseLightPurpleProfileIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
