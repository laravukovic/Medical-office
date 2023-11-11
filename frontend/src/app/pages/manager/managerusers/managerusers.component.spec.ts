import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerusersComponent } from './managerusers.component';

describe('ManagerusersComponent', () => {
  let component: ManagerusersComponent;
  let fixture: ComponentFixture<ManagerusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
