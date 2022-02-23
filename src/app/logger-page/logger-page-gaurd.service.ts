import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";
import {User} from "../User";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoggerPageGaurdService implements CanActivate{
  private user: User;
  private status = true;
  constructor(private httpClient: HttpClient) {
    this.user = new User("", "", "");
  }
  setUser(user: User){
    this.user = user;
    console.log(user);
    console.log(this.user);
  }
  private getStarted(){
    const httpHeaders = new HttpHeaders({'content-type': 'application/json'});
    let userJson: any = {"name": this.user.getName(), "emailAddress": this.user.getEmail(), "password": this.user.getPassword()};
    return this.httpClient.post("http://localhost:9090/emailLogger/signUp", userJson, {headers: httpHeaders, responseType:"text"})
  }
  canActivate(){
    if(this.user.getName() == "" && this.user.getEmail()=="" && this.user.getPassword() == "") return true;
    this.getStarted().subscribe(
      status => {
        console.log(status);
        this.status = !<boolean><unknown>status;
      }
    );
    return this.status
  }

}
