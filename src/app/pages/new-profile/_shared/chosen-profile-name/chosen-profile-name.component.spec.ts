import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenProfileNameComponent } from './chosen-profile-name.component';

describe('ChosenProfileNameComponent', () => {
  let component: ChosenProfileNameComponent;
  let fixture: ComponentFixture<ChosenProfileNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosenProfileNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChosenProfileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
