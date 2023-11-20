import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNewOrganizationIllustrationComponent } from './create-new-organization-illustration.component';

describe('CreateNewOrganizationIllustrationComponent', () => {
  let component: CreateNewOrganizationIllustrationComponent;
  let fixture: ComponentFixture<CreateNewOrganizationIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewOrganizationIllustrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewOrganizationIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
