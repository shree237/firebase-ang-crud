import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShreeComponent } from './shree.component';

describe('ShreeComponent', () => {
  let component: ShreeComponent;
  let fixture: ComponentFixture<ShreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShreeComponent]
    });
    fixture = TestBed.createComponent(ShreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
