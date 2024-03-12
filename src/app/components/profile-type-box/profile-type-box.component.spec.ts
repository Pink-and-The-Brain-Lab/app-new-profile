import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileTypeBoxComponent } from './profile-type-box.component';

describe('ProfileTypeBoxComponent', () => {
  let component: ProfileTypeBoxComponent;
  let fixture: ComponentFixture<ProfileTypeBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileTypeBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileTypeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.title).toBe('');
    expect(component.text).toBe('');
    expect(component.buttonText).toBe('');
    expect(component.buttonRoute).toBe('');
    expect(component.buttonType).toBe('primary');
  });

  it('should emit button event', () => {
    spyOn(component.buttonEvent, 'emit');
    const route = 'route-test';
    component.buttonRoute = route;
    component.createNew();
    expect(component.buttonEvent.emit).toHaveBeenCalledWith(route);
  });
});
