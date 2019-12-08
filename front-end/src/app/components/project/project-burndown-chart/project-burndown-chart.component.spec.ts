import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectBurndownChartComponent} from './project-burndown-chart.component';

describe('ProjectBurndownChartComponent', () => {
  let component: ProjectBurndownChartComponent;
  let fixture: ComponentFixture<ProjectBurndownChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBurndownChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBurndownChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
