import { Component, OnInit } from '@angular/core';
import {UserPageGuardService} from "./user-page-guard.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.scss']
})
export class ConfirmPageComponent implements OnInit {
  CurrentUserEmail: string = "";
  constructor(private userPageGuard :UserPageGuardService, private httpClient:HttpClient) { }

  setUserEmail(){
    this.CurrentUserEmail = this.userPageGuard.getUserEmail();
    console.log(this.CurrentUserEmail);
  }
  getUserEmail(){
    console.log(this.CurrentUserEmail);
    return this.userPageGuard.getUserEmail();
  }

  logOut(){
    return this.httpClient.post("http://localhost:9090/emailLogger/logOut", this.CurrentUserEmail,
      {responseType: "text"}).subscribe(
      () =>{console.log("Logged Out Successfully")}
    );
  }

  ngOnInit(): void {
  }

}
