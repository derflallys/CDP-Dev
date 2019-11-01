export class Project {
  title: string;
  duration: string;
  description: string;
  url: string;
  refspecifying: string;

  constructor(title: string, duration: string, description: string, url: string, refspecifying: string) {
    this.title = title;
    this.duration = duration ;
    this.description = description;
    this.url = url;
    this.refspecifying = refspecifying;
  }
}
