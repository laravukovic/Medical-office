import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerpassComponent } from './managerpass.component';

describe('ManagerpassComponent', () => {
  let component: ManagerpassComponent;
  let fixture: ComponentFixture<ManagerpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerpassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
