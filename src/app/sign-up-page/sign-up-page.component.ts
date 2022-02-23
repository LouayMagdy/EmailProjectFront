import { Component, OnInit } from '@angular/core';
import {User} from "../User";
import {LoggerPageGaurdService} from "../logger-page/logger-page-gaurd.service";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  private user: User;
  private confirmPass: string = '';
  status1: boolean = false;
  constructor(private loggerPageGaurd: LoggerPageGaurdService) {
    this.user = new User("", "", "");
    this.confirmPass = '';
  }
  setName(nameEvent: any){
    let startButton = <HTMLInputElement>document.getElementById("createAccount");
    this.user.setName((nameEvent.target as HTMLInputElement).value);
    console.log(this.user.getName());
    if(this.validateEmail(this.user.getEmail()) && this.user.getName() != '' && this.user.getPassword() != '' &&
    this.confirmPass == this.user.getPassword())
      startButton.disabled = false;
    else startButton.disabled = true;
  }
  setEmail(emailEvent: any){
    let startButton = <HTMLInputElement>document.getElementById("createAccount");
    this.user.setEmail((emailEvent.target as HTMLInputElement).value) ;
    if(this.validateEmail(this.user.getEmail()) && this.user.getName() != '' && this.user.getPassword() != '' &&
      this.confirmPass == this.user.getPassword())
      startButton.disabled = false;
    else startButton!.disabled = true;
    console.log(this.user.getEmail())
  }
  setPassword(passEvent: any){
    let startButton = <HTMLInputElement>document.getElementById("createAccount");
    this.user.setPassword((passEvent.target as HTMLInputElement).value);
    if(this.validateEmail(this.user.getEmail())  && this.user.getName() != '' && this.user.getPassword() != '' &&
      this.confirmPass == this.user.getPassword())
      startButton.disabled = false;
    else startButton.disabled = true;
    console.log(this.user.getPassword());
  }
  confirmPassword(passEvent: any){
    let startButton = <HTMLInputElement>document.getElementById("createAccount");
    this.confirmPass = (passEvent.target as HTMLInputElement).value
    if(this.validateEmail(this.user.getEmail())  && this.user.getName() != '' && this.user.getPassword() != '' &&
      this.confirmPass == this.user.getPassword())
      startButton.disabled = false;
    else startButton.disabled = true;
    console.log((passEvent.target as HTMLInputElement).value);
    console.log(this.user);
  }

  start(){
    console.log(this.user);
    this.loggerPageGaurd.setUser(this.user);
    this.user = new User("", "", "");
    this.status1 = this.loggerPageGaurd.canActivate();
    this.loggerPageGaurd.setUser(this.user);
    console.log(this.status1);
    let getStartedWin = <HTMLInputElement> document.getElementById('getStarted');
    getStartedWin!.style.visibility = 'visible';
  }
  getStarted(){
    let create = <HTMLInputElement> document.getElementById('register-login');
    create!.style.visibility = 'visible';
    let getStartedWin = <HTMLInputElement> document.getElementById('getStarted');
    getStartedWin!.style.visibility = 'hidden';
  }

  private validateEmail(emailAdDress: string){
    let found = 0;
    let standard = "@Email.com"
    let i = 0, j = 0;
    while(i < emailAdDress.length){
      while (j < standard.length){
        if(emailAdDress.charAt(i + j) == standard.charAt(j)) j++;
        else break;
      }
      if(j == standard.length) found++;
      i++;
      j = 0;
    }
    console.log(found);
    return found == 1 && emailAdDress.charAt(emailAdDress.length - standard.length) === "@" && !emailAdDress.includes(',');
  }

  ngOnInit(): void {
  }

}
