
export class User{
  private userName: string;
  private password: string;
  private userEmail: string;

  constructor(name: string, password: string, email: string) {
    this.userName = name;
    this.password = password;
    this.userEmail = email;
  }

  setName(name: string){this.userName = name;}
  setPassword(password: string){this.password = password;}
  setEmail(email: string){this.userEmail = email;}

  getName(){return this.userName;}
  getPassword(){return this.password;}
  getEmail(){return this.userEmail}
}
