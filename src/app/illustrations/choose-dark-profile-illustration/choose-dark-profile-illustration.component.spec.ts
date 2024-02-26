import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChooseDarkProfileIllustrationComponent } from './choose-dark-profile-illustration.component';

describe('ChooseDarkProfileIllustrationComponent', () => {
  let component: ChooseDarkProfileIllustrationComponent;
  let fixture: ComponentFixture<ChooseDarkProfileIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseDarkProfileIllustrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseDarkProfileIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
