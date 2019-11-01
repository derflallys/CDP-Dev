export class Issue {

  id: number;
  description: string;
  state: string;
  priority: string;
  difficulty: number;

  constructor(id: number= null, description: string, state: string, priority: string, difficulty: number) {
    this.id = id;
    this.description = description;
    this.state = state;
    this.priority = priority;
    this.difficulty = difficulty;
  }
}
