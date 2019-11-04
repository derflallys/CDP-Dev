export class Sprint {
  _id: string;
  sprintId: number;
  title: string;
  projectId: string;
  startDate: string;
  endDate: string;

  constructor(_id: string, sprintId: number, projectId: string, title: string, startDate: string, endDate: string) {
    this._id = _id;
    this.sprintId = sprintId;
    this.projectId = projectId;
    this.title = title;
    this.startDate = startDate ;
    this.endDate = endDate;
  }
}
