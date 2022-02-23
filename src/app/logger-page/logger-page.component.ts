import { Component, OnInit } from '@angular/core';
import {User} from "../User";
import {UserPageGuardService} from "../confirm-page/user-page-guard.service";

@Component({
  selector: 'app-logger-page',
  templateUrl: './logger-page.component.html',
  styleUrls: ['./logger-page.component.scss']
})
export class LoggerPageComponent implements OnInit {
  private user: User
  email: string = "";
  constructor(private userPageGuard :UserPageGuardService) {
    this.user = new User("", "", "");
  }
  setEmail(emailEvent: any){
    this.user.setEmail((emailEvent.target as HTMLInputElement).value);
    this.email = this.user.getEmail();
    console.log(this.user.getEmail());
    this.userPageGuard.setUser(this.user);
    this.userPageGuard.canActivate();
  }
  setPassword(passEvent: any){
    this.user.setPassword((passEvent.target as HTMLInputElement).value);
    console.log(this.user.getPassword());
    this.userPageGuard.setUser(this.user);
    this.userPageGuard.canActivate();
  }
  ngOnInit(): void {
  }

}
