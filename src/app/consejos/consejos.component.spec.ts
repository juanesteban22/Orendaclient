import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejosComponent } from './consejos.component';

describe('ConsejosComponent', () => {
  let component: ConsejosComponent;
  let fixture: ComponentFixture<ConsejosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsejosComponent]
    });
    fixture = TestBed.createComponent(ConsejosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
