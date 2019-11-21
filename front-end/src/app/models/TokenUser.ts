export class TokenUser {
  token: string;
  username: string;
  email: string;
  id: string;

  constructor(token: string, username: string, email: string, id: string) {
    this.token = token;
    this.username = username;
    this.email = email;
    this.id = id;
  }
}
