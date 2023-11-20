import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCustomizeAvatarComponent } from './profile-customize-avatar.component';

describe('ProfileCustomizeAvatarComponent', () => {
  let component: ProfileCustomizeAvatarComponent;
  let fixture: ComponentFixture<ProfileCustomizeAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCustomizeAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCustomizeAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
