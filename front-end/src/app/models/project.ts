export class Project {
  _id: number;
  title: string;
  duration: number;
  description: string;
  repositoryURL: string;
  refspecifying: string;

  constructor(id: number = null, title: string, duration: number, description: string, repositoryURL: string, refspecifying: string) {
    this._id = id;
    this.title = title;
    this.duration = duration;
    this.description = description;
    this.repositoryURL = repositoryURL;
    this.refspecifying = refspecifying;
  }
}
