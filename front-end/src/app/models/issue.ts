export class Issue {
  _id: string;
  issueId: number;
  sprintId : string;
  projectId: string;
  description: string;
  state: string;
  priority: string;
  difficulty: number;

  constructor(projectId: string, id: string = null, description: string, state: string, priority: string, difficulty: number, sprintId: string = null) {
    this._id = id;
    this.sprintId = sprintId;
    this.projectId = projectId;
    this.description = description;
    this.state = state;
    this.priority = priority;
    this.difficulty = difficulty;
  }
}
