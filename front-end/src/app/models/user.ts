export class User {
  _id: string;
  userName: string;
  email: string;
  password: string;

  constructor(id: string = null, userName: string, email: string, password: string) {
    this._id = id;
    this.userName = userName;
    this.email = email;
    this.password = password;
  }
}
