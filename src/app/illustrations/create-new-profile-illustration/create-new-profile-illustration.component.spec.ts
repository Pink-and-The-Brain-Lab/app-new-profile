import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNewProfileIllustrationComponent } from './create-new-profile-illustration.component';

describe('CreateNewProfileIllustrationComponent', () => {
  let component: CreateNewProfileIllustrationComponent;
  let fixture: ComponentFixture<CreateNewProfileIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewProfileIllustrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewProfileIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
