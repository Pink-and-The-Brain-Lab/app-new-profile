import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProfileTypeComponent } from './select-profile-type.component';

describe('SelectProfileTypeComponent', () => {
  let component: SelectProfileTypeComponent;
  let fixture: ComponentFixture<SelectProfileTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProfileTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProfileTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
