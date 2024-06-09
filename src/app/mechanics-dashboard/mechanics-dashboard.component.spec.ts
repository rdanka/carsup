import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicsDashboardComponent } from './mechanics-dashboard.component';

describe('MechanicsDashboardComponent', () => {
  let component: MechanicsDashboardComponent;
  let fixture: ComponentFixture<MechanicsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
