export class Sprint {
  sprintId: number;
  title: string;
  projectId: string;
  startDate: string;
  endDate: string;

  constructor(sprintId: number, projectId: string, title: string, startDate: string, endDate: string) {
    this.sprintId = sprintId;
    this.projectId = projectId;
    this.title = title;
    this.startDate = startDate ;
    this.endDate = endDate;
  }
}
