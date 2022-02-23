import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserBackLinkService {
  private currentUserEmail: string = "";
  constructor(private httpClient :HttpClient) {}
  setUserEmail(email: string){
    this.currentUserEmail = email;
  }

  logOut(){
    return this.httpClient.post("http://localhost:9090/emailLogger/logOut", this.currentUserEmail,
      {responseType: "text"})
  }

  getInbox(){
    return this.httpClient.post(`http://localhost:9090/emailMessage/getFile/${this.currentUserEmail}`,
      "Inbox");
  }
  getSent(){
    return this.httpClient.post(`http://localhost:9090/emailMessage/getFile/${this.currentUserEmail}`,
      "Sent");
  }
  getStarred(){
    return this.httpClient.post(`http://localhost:9090/emailMessage/getFile/${this.currentUserEmail}`,
      "Starred");
  }
  getImportant(){
    return this.httpClient.post(`http://localhost:9090/emailMessage/getFile/${this.currentUserEmail}`,
      "Important");
  }
  getDraft(){
    return this.httpClient.post(`http://localhost:9090/emailMessage/getFile/${this.currentUserEmail}`,
      "Draft");
  }
  getDeleted(){
    return this.httpClient.post(`http://localhost:9090/emailMessage/getFile/${this.currentUserEmail}`,
      "Trashed");
  }
  getCustom(){
    return this.httpClient.post(`http://localhost:9090/emailMessage/getFile/${this.currentUserEmail}`,
      "Custom");
  }
  getContacts(){
    return this.httpClient.get(`http://localhost:9090/emailUser/contacts/${this.currentUserEmail}`);
  }

  searchAllContacts(searchFor: string){
    return this.httpClient.post(`http://localhost:9090/emailUser/searchUsers/${this.currentUserEmail}`, searchFor,
      {responseType: "json"});
  }
  searchMyContacts(searchFor: string){
    return this.httpClient.post(`http://localhost:9090/emailUser/searchContact/${this.currentUserEmail}`, searchFor,
      {responseType: "json"});
  }

  addContact(user: any){
    const httpHeaders = new HttpHeaders({'content-type': 'application/json'});
    return this.httpClient.post(`http://localhost:9090/emailUser/addContact/${this.currentUserEmail}`, user,
      {headers: httpHeaders, responseType: "text"});
  }
  editContact(user: any){
    //let headers = new HttpHeaders({'content-type': 'application/json'});
    return this.httpClient.post(`http://localhost:9090/emailUser/editContact/${this.currentUserEmail}`, user,
      {responseType: "text"});
  }
  deleteContact(user: any){
    return this.httpClient.post(`http://localhost:9090/emailUser/deleteContact/${this.currentUserEmail}`, user,
      {responseType: "text"});
  }

  starMessages(markedMessages: Array<string>){
    return this.httpClient.post(`http://localhost:9090/emailMessage/starMessage/${this.currentUserEmail}`,
      markedMessages)
  }
  makeMessagesImportant(markedMessages: Array<string>){
    return this.httpClient.post(`http://localhost:9090/emailMessage/importantMessage/${this.currentUserEmail}`,
      markedMessages);
  }
  deleteMessages(markedMessages: Array<string>){
    return this.httpClient.post(`http://localhost:9090/emailMessage/deleteMessage/${this.currentUserEmail}`,
      markedMessages);
  }
  makeMessagesCustom(markedMessages: Array<string>){
    return this.httpClient.post(`http://localhost:9090/emailMessage/customMessage/${this.currentUserEmail}`,
      markedMessages);
  }

  unStarMessage(id: string){
    return this.httpClient.post(`http://localhost:9090/emailMessage/unstarMessage/${this.currentUserEmail}`, id);
  }
  makeMessageUnImportant(id : string){
    return this.httpClient.post(`http://localhost:9090/emailMessage/makeUnImportant/${this.currentUserEmail}`, id);
  }
  makeMessageUnCustom(id: string){
    return this.httpClient.post(`http://localhost:9090/emailMessage/makeUnCustom/${this.currentUserEmail}`, id)
  }


  nonFilteredSearch(searchFor: string){
    return this.httpClient.post(`http://localhost:9090/emailMessage/noFilterSearch/${this.currentUserEmail}`,
      searchFor, {responseType: "json"});
  }
  filteredSearch(message: any){
    const httpHeaders = new HttpHeaders({'content-type': 'application/json'});
    return this.httpClient.post(`http://localhost:9090/emailMessage/filterSearch/${this.currentUserEmail}`,
      message, {headers: httpHeaders, responseType: "json"});
  }

  postAttachment(attachment: FormData){
    let headers = new HttpHeaders();
    // headers.append('Accept', 'application/json');
    headers.append("Content-Type", 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');
    return this.httpClient.post("http://localhost:9090/attachment/upload", attachment,
      {headers: headers, responseType: "text"});
  }
  sendEmail(message: any){
    const httpHeaders = new HttpHeaders({'content-type': 'application/json'});
    return this.httpClient.post("http://localhost:9090/emailMessage/send",
      message, {headers: httpHeaders});
  }
  makeDraft(message: any){
    const httpHeaders = new HttpHeaders({'content-type': 'application/json'});
    return this.httpClient.post(`http://localhost:9090/emailMessage/draftMessage/${this.currentUserEmail}`,
      message, {headers: httpHeaders});
  }
  readMessage(iD: string){
    return this.httpClient.post(`http://localhost:9090/emailMessage/readMessage/${this.currentUserEmail}`,
      iD);
  }
}
