import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdCatComponent } from './prod-cat.component';

describe('ProdCatComponent', () => {
  let component: ProdCatComponent;
  let fixture: ComponentFixture<ProdCatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdCatComponent]
    });
    fixture = TestBed.createComponent(ProdCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
