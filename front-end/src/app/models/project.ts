export class Project {
  _id: number;
  title: string;
  duration: number;
  description: string;
  url: string;
  refspecifying: string;

  constructor(id: number = null, title: string, duration: number, description: string, url: string, refspecifying: string) {
    this._id = id;
    this.title = title;
    this.duration = duration;
    this.description = description;
    this.url = url;
    this.refspecifying = refspecifying;
  }
}
