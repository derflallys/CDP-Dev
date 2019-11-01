export class Issue {

  _id: number;
  description: string;
  state: string;
  priority: string;
  difficulty: number;

  constructor(id: number= null, description: string, state: string, priority: string, difficulty: number) {
    this._id = id;
    this.description = description;
    this.state = state;
    this.priority = priority;
    this.difficulty = difficulty;
  }
}
