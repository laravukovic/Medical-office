import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageraddComponent } from './manageradd.component';

describe('ManageraddComponent', () => {
  let component: ManageraddComponent;
  let fixture: ComponentFixture<ManageraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
