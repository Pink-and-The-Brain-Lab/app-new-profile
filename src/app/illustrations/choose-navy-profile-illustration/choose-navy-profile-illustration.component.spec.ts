import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChooseNavyProfileIllustrationComponent } from './choose-navy-profile-illustration.component';

describe('ChooseNavyProfileIllustrationComponent', () => {
  let component: ChooseNavyProfileIllustrationComponent;
  let fixture: ComponentFixture<ChooseNavyProfileIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseNavyProfileIllustrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseNavyProfileIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
