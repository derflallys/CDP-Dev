export class Sprint {
  num: number;
  title: string;
  startDate: string;
  endDate: string;

  constructor(num: number, title: string, startDate: string, endDate: string) {
    this.num = num;
    this.title = title;
    this.startDate = startDate ;
    this.endDate = endDate;
  }
}
