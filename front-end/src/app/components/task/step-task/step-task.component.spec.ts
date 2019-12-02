import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTaskComponent } from './step-task.component';
import { Task } from 'src/app/models/task';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material';

import { isEqual } from 'lodash'

export interface StepTaskModel {
  tasks: Task[];
}

fdescribe('StepTaskComponent', () => {
  let component: StepTaskComponent;
  let fixture: ComponentFixture<StepTaskComponent>;

  const nbTasks = 6;
  const tasks: Task[] = new Array(nbTasks);
  const dependencies = [ [1], [2], [4], [4], [], [4, 1] ]

  // In tasks, we will only considers taskId and dependencies property.
  for (let i = 0; i < nbTasks; i++) {
    tasks[i] = new Task(null, null, null, null, null, null, null, null);
    tasks[i].state = "TODO"; // states are used in html for color render purpose (must be defined).
    tasks[i].taskId = i;
    tasks[i].dependencies = dependencies[i];
  }

  const model: StepTaskModel = { tasks: tasks };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepTaskComponent ],
      imports: [ MatDialogModule ],
      providers: [{
        provide: MAT_DIALOG_DATA,
        useValue: model
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should match the expected datastructure', () => {
    const expectedGraph = { 0: [], 1: [0, 5], 2: [1], 3: [], 4: [2, 3, 5], 5: [] };
    const expectedTaskOrder = [4, 3, 2, 1, 5, 0];
    const expectedStepTasks = [ [tasks[4]], [tasks[3], tasks[2]], [tasks[1]], [tasks[5], tasks[0]] ];

    expect(component).toBeTruthy();

    expect(isEqual(component.dependencyGraph, expectedGraph)).toBeTruthy();
    let equalOrder = true;
    component.orderedTasks.forEach(t => {
      if (t != expectedTaskOrder[component.orderedTasks.indexOf(t)]) {
        equalOrder = false;
      }
    })
    expect(equalOrder).toBeTruthy(); // Does not check for type
    expect(isEqual(component.stepsTasks, expectedStepTasks)).toBeTruthy();
  });

});
