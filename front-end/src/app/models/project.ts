export class Project {
  _id: string;
  title: string;
  users: any[]; // Store UserRole objects
  duration: number;
  description: string;
  createdAt: Date;
  createBy: string;
  repositoryURL: string;
  refspecifying: string;

  constructor(id: string, title: string, duration: number, description: string, repositoryURL: string, refspecifying: string, createBy: string) {
    if (id !== null) {
      this._id = id;
    }
    this.title = title;
    const userRole = { user: createBy, role: 'PO' };
    this.users = [];
    this.users.push(userRole);
    this.createBy = createBy;
    this.duration = duration;
    this.description = description;
    this.repositoryURL = repositoryURL;
    this.refspecifying = refspecifying;
  }

}
