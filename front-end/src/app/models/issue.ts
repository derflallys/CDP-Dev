export class Issue {
  _id: string;
  issueId: number;
  projectId: string;
  description: string;
  state: string;
  priority: string;
  difficulty: number;

  constructor(projectId:string,id: string = null, description: string, state: string, priority: string, difficulty: number) {
    this._id = id;
    this.projectId = projectId;
    this.description = description;
    this.state = state;
    this.priority = priority;
    this.difficulty = difficulty;
  }
}
