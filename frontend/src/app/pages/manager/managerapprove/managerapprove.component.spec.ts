import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerapproveComponent } from './managerapprove.component';

describe('ManagerapproveComponent', () => {
  let component: ManagerapproveComponent;
  let fixture: ComponentFixture<ManagerapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerapproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
