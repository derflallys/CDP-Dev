import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTaskComponent } from './step-task.component';
import { Task } from 'src/app/models/task';

describe('StepTaskComponent', () => {
  let component: StepTaskComponent;
  let fixture: ComponentFixture<StepTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Dataset 0
    const nbTasks = 5;
    const tasks: Task[] = [];
    let dependencies = [ [0, 1], [1, 2], [3], [5], [] ]
    for (let i = 0; i < nbTasks; i++) {
      tasks[i] = new Task(null, null, null, null, null, null, null, null);
      tasks[i].taskId = i;
      tasks[i].dependencies = dependencies[i];
    }

    // TODO:

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
