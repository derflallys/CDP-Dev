import { Component, Inject, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { MAT_DIALOG_DATA } from '@angular/material';
import topologicalSort from './topological-sort';

/**
 * Provides visualization for organizing tasks in different steps based on their dependencies.
 * Firstly, the tasks is described as a DAG (if it can't be, the component displays an error).
 * If the graph is not a DAG (i.e. there is a cycle), the topological sort is not applicable.
 * Secondly, a topological sort is applied on the DAG to determine the task ordering.
 * Finally, it apply a step organisation algorithm (i.e. check which task can be effectuated
 * simultaneousely). Tasks can be effectuated simultaneously iff there is no dependencies
 * between task in the same step and if tasks are adjacent in the ordered task list.
 */
@Component({
  selector: 'app-step-task',
  templateUrl: './step-task.component.html',
  styleUrls: ['./step-task.component.css']
})
export class StepTaskComponent implements OnInit {

  // Main tasks data set
  tasks: Task[] = this.data.tasks;
  // Intermediate DS
  dependencyGraph: Object;
  orderedTasks: Number[];
  // Final visualization DS
  stepsTasks: Array<Task[]>;
  // Information data
  hasCircularDependency = false;
  numberOfStep: Number;
  numberMaxDeveloper: Number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { tasks: null }
  ) { }

  ngOnInit() {
    console.log('Tasks:', this.tasks);
    this.dependencyGraph = this.setupDependencyGraph(this.tasks);
    console.log('Dependency Graph:', this.dependencyGraph);
    try {
      this.orderedTasks = topologicalSort(this.dependencyGraph);
      console.log('Ordered Tasks:', this.orderedTasks);
    } catch(error) {
      this.hasCircularDependency = true;
      console.log("The dependency graph contains at least one cycle.")
    }
    if (!this.hasCircularDependency) {
      let stepsTaskIds = this.resolveStepOrganisation(this.orderedTasks);
      this.stepsTasks = this.convertDatastructure(stepsTaskIds);
      console.log('Step Organisation', this.stepsTasks)
      this.numberOfStep = this.stepsTasks.length;
      this.numberMaxDeveloper = this.getNumberMaxDeveloper();
    }
  }

  /**
   * The number of maximum developer is equal to the number of maximum tasks that
   * can be effectuated simultaneously (i.e. the length of the longest step).
   * @return {number} The maximum number of developper on the sprint.
   */
  getNumberMaxDeveloper(): number {
    var stepLengths = this.stepsTasks.map(s => s.length);
    let maxDevOnStep = stepLengths.indexOf(Math.max.apply(Math, stepLengths));
    return this.stepsTasks[maxDevOnStep].length;
  }

  /**
   * Create a graph from the tasks dependencies information.
   * If task x depends on task y, then there is an arc from x to y 
   * (and so the y graph's property is set to [x]).
   * @param {Task[]} tasks The set of tasks on which construct the graph.
   * @return {Object} The generated dependency graph.
   */
  setupDependencyGraph(tasks: Task[]): object {
    const taskIds = tasks.map(t => t.taskId);
    const depGraph: Object = new Object;
    taskIds.forEach(id => { depGraph[id] = [] });
    let indexTj: number, depsTj: Number[];
    taskIds.forEach(function(ti) {
      taskIds.forEach(function(tj) {
        indexTj = tasks.findIndex(t => t.taskId === tj);
        depsTj = tasks[indexTj].dependencies;
        if (depsTj.includes(ti)) {
          depGraph[ti].push(tj);
        }
      })
    })
    return depGraph;
  }

  /**
   * Searchs in an ordered set of tasks if some can be effectuated simultaneously.
   * Two (or more) tasks can be effectuated simultaneously (i.e. on a same time step)
   * if and only if task has no dependency with other previous tasks that is on the
   * same step and if tasks is adjacent in a topological-sort ordering.
   * @param {Number[]} tasks The ordered set of tasks.
   * @returns {Array<Number[]>} Array of steps where each step is array of taskIds.
   */
  resolveStepOrganisation(tasks: Number[]): Array<Number[]> {
    let nbTasks = tasks.length;
    const stepOrganisation = [];

    for (let i = 0; i < nbTasks; i++) { 
      let ti = tasks[i];
      let stepTasks = []; // Stores tasks that is on the same step.
      stepTasks.push(Number(ti)); // Add the first task to the beginning step.
      for (let j = i + 1; j < nbTasks; j++) {
        let tj = tasks[j];
        let existDependency = false;
        stepTasks.forEach(t => {
          if (this.existDependencyBetween(t, tj)) {
            existDependency = true;
          }
        })
        if (!existDependency) {
          // Tasks in stepTasks and task tj can be effectuated simultaneously.
          stepTasks.push(Number(tj));
          // Considers a new ti in order to moving forward two by two on the step.
          ti = tasks[++i];
        } else {
          break; // End of the current step.
        }
      }
      stepOrganisation.push(stepTasks);
    }
    return stepOrganisation;
  }

  /**
   * Determine if it exists dependencies between two tasks.
   * @param {Number} ti The taskId of the first task.
   * @param {Number} tj The taskId of the second task.
   * @returns {boolean} true if there is dependencies between the two tasks, false otherwise.
   */
  existDependencyBetween(ti: Number, tj: Number): boolean {
    const depsTi = this.dependencyGraph[String(ti)];
    const depsTj = this.dependencyGraph[String(tj)];
    // If there is no dependencies, dependencies array property is undefined
    return (
      (typeof depsTi != 'undefined' && depsTi.includes(Number(tj))) ||
      (typeof depsTj != 'undefined' && depsTj.includes(Number(ti)))
    );
  }

  /**
   * Converts the taskIds-based step datastructure into Task-based step datatstucture.
   * @param {Array<Number[]>} stepsTaskIds The step datastructure to convert.
   * @returns {Array<Task[]>} The converted datastructure.
   */
  convertDatastructure(stepsTaskIds: Array<Number[]>): Array<Task[]> {
    const stepsTasks = [];
    stepsTaskIds.forEach(tasks => {
      stepsTasks.push(
        tasks.map((taskId: number) => {
          let index = this.tasks.findIndex(t => t.taskId == taskId);
          return this.tasks[index];
        })
      )
    })
    return stepsTasks;
  }

}
