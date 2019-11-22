export class Task {
    _id: string;
    issues: Number[];
    dev: string;
    taskId: number;
    projectId: string;
    sprintId: string;
    dod: string;
    state: string;
    toTest: boolean;
    toDoc: boolean;
    startDate: Date;
    endDate: Date;

    constructor(id: string, projectId: string, sprintId: string, issues: Number[], dod: string, startDate: Date, endDate: Date) {
      if (id !== null) {
        this._id = id;
      }
      this.projectId = projectId;
      this.sprintId = sprintId;
      this.issues = issues;
      this.dod = dod;
      this.startDate = startDate;
      this.endDate = endDate;
    }

}
