export class Issue {

  id: number;
  description: string;
  state: string;
  priority: string;
  difficulty: number;
  planning: string;
  constructor(id: number, description: string, state: string, priority: string, difficulty: number, planning: string) {
    this.id = id;
    this.description = description;
    this.state = state;
    this.priority = priority;
    this.difficulty = difficulty;
    this.planning = planning;
  }
}
