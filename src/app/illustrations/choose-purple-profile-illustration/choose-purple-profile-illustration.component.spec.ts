import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChoosePurpleProfileIllustrationComponent } from './choose-purple-profile-illustration.component';

describe('ChoosePurpleProfileIllustrationComponent', () => {
  let component: ChoosePurpleProfileIllustrationComponent;
  let fixture: ComponentFixture<ChoosePurpleProfileIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoosePurpleProfileIllustrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoosePurpleProfileIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
