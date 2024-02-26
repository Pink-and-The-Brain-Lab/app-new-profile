import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChooseLightProfileIllustrationComponent } from './choose-light-profile-illustration.component';

describe('ChooseLightProfileIllustrationComponent', () => {
  let component: ChooseLightProfileIllustrationComponent;
  let fixture: ComponentFixture<ChooseLightProfileIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseLightProfileIllustrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseLightProfileIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
