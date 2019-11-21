import { User }  from '../models/user';

export class Task {
    _id: string;
    issues: Array<Number>;
    dev: string;
    taskId: number;
    dod: string;
    state: string;
    toTest: boolean;
    toDoc: boolean;
    startDate: Date;
    endDate: Date;

    constructor(id: string, issues: Array<Number>, dev: string, taskId: number, dod: string, state: string, toTest: boolean, toDoc: boolean, startDate: Date, endDate: Date) {
      if ( id !== null) {
      this._id = id;
      }
      this.issues = issues;
      this.dev = dev;
      this.taskId = taskId;
      this.dod = dod;
      this.state = state;
      this.toTest = toTest;
      this.toDoc = toDoc;
      this.startDate = startDate;
      this.endDate = endDate;
    }

}
