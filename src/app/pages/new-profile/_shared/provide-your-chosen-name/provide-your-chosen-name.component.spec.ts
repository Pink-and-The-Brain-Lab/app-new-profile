import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideYourChosenNameComponent } from './provide-your-chosen-name.component';

describe('ProvideYourChosenNameComponent', () => {
  let component: ProvideYourChosenNameComponent;
  let fixture: ComponentFixture<ProvideYourChosenNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvideYourChosenNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvideYourChosenNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
