export class Sprint {
  _id: string;
  sprintId: number;
  title: string;
  state: string;
  projectId: string;
  startDate: string;
  endDate: string;
  release: string;

constructor(id: string, sprintId: number, projectId: string, title: string, startDate: string, endDate: string, state: string = 'To Start', release: string) {
    if ( id !== null) {
    this._id = id;
    }
    this.sprintId = sprintId;
    this.state = state;
    this.projectId = projectId;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.release = release ;
  }
}
