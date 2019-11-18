import { User }  from '../models/user';

export class Project {
  _id: string;
  title: string;
  users: Array<User>
  duration: number;
  description: string;
  createdAt: Date;
  repositoryURL: string;
  refspecifying: string;

  constructor(id: string, title: string, users: Array<User>, duration: number, description: string, repositoryURL: string, refspecifying: string) {
    this.title = title;
    this.users = users;
    this.duration = duration;
    this.description = description;
    this.repositoryURL = repositoryURL;
    this.refspecifying = refspecifying;
  }
}
