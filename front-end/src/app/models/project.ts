export class Project {
  _id: string;
  title: string;
  users: Array<Object> // Store UserRole objects
  duration: number;
  description: string;
  createdAt: Date;
  repositoryURL: string;
  refspecifying: string;

  constructor(id: string, title: string, duration: number, description: string, repositoryURL: string, refspecifying: string) {
    this._id = id
    this.title = title;
    this.users = [];
    this.duration = duration;
    this.description = description;
    this.repositoryURL = repositoryURL;
    this.refspecifying = refspecifying;
  }

}
