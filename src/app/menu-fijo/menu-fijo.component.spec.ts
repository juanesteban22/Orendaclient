import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFijoComponent } from './menu-fijo.component';

describe('MenuFijoComponent', () => {
  let component: MenuFijoComponent;
  let fixture: ComponentFixture<MenuFijoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuFijoComponent]
    });
    fixture = TestBed.createComponent(MenuFijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
