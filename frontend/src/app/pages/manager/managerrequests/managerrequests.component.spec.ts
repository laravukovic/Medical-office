import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerrequestsComponent } from './managerrequests.component';

describe('ManagerrequestsComponent', () => {
  let component: ManagerrequestsComponent;
  let fixture: ComponentFixture<ManagerrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerrequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
