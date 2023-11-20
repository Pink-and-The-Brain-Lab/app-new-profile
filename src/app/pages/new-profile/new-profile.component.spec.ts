import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewProfileRoutingModule } from './new-profile-routing.module';
import { NewProfileComponent } from './new-profile.component';

describe('NewProfileComponent', () => {
  let component: NewProfileComponent;
  let fixture: ComponentFixture<NewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProfileComponent ],
      imports: [NewProfileRoutingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
