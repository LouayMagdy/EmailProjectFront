import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../User";

@Injectable({
  providedIn: 'root'
})
export class UserPageGuardService implements CanActivate{
  private status = "";
  private user : User;
  constructor(private httpClient: HttpClient) {
    this.user = new User("", "", "");
  }
  setUser(user: User){
    this.user = user;
  }
  getUserEmail(){
    return this.user.getEmail();
  }
  private tryLogIn(){
    let userJson = {"emailAddress": this.user.getEmail(), "password": this.user.getPassword()}
    const httpHeaders = new HttpHeaders({'content-type': 'application/json'});
    return this.httpClient.post("http://localhost:9090/emailLogger/logIn", userJson, {headers: httpHeaders, responseType: "text"});
  }
  canActivate(){
    this.tryLogIn().subscribe(
      status => {
        this.status = status;
        console.log(status);
      });
    return this.status == "welcome" || this.status == "loggedIn";
  }
}
