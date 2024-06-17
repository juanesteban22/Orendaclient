import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoloadComponent } from './productoload.component';

describe('ProductoloadComponent', () => {
  let component: ProductoloadComponent;
  let fixture: ComponentFixture<ProductoloadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoloadComponent]
    });
    fixture = TestBed.createComponent(ProductoloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
