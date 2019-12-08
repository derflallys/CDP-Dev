import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SprintKanbanComponent} from './sprint-kanban.component';

describe('SprintKanbanComponent', () => {
  let component: SprintKanbanComponent;
  let fixture: ComponentFixture<SprintKanbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintKanbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
