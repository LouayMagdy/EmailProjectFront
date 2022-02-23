import { Component, OnInit } from '@angular/core';
import {UserPageGuardService} from "../confirm-page/user-page-guard.service";
import {User} from "../User";
import {UserBackLinkService} from "./user-back-link.service";
import {EmailMessage} from "../EmailMessage";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  messagesRequested: Array<any>=[];
  messagesToAppear: Array<any>=[];
  messagesMarked: Array<string>=[];
  usersRequested: Array<any>=[];
  usersToAppear: Array<any>=[];
  isUserAFriend : Array<boolean> = [false, false, false, false, false];

  user: any;
  message: EmailMessage;


  currentUserEmail = '';
  currentPage:number = 1;
  currentCategory: string = "";
  contactsCategory: string = '';
  contactsType: string = '';

  formData: FormData = new FormData();
  file?: File;
  fileName: string="";
  filePath: string="";
  fileType: string="";

  maxPageCount: number = 1;
  minPageCount: number = 1;

  constructor(private userPageGuard : UserPageGuardService, private userBackLink: UserBackLinkService
  , private route:ActivatedRoute) {
    this.currentUserEmail = <string>this.route.snapshot.paramMap.get('userEmail');
    console.log(this.currentUserEmail)
    //this.currentUserEmail = "lolo@Email.com";
    this.userPageGuard.setUser(new User("", "", ""));
    this.message = new EmailMessage();
    this.getInbox();
    this.displayMessages();
    this.currentCategory = "Inbox : " + this.messagesRequested.length + "Mails";
    this.contactsCategory = "Your Contacts: " + this.usersRequested.length + "Contacts";
    this.contactsType = "Your Contacts";
  }


  logOut(){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.logOut().subscribe(
      () => {console.log("Logged Out Successfully")}
    );
  }

  getInbox(){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.getInbox().subscribe(
      data =>{
        this.messagesRequested = <Array<any>>data;
        this.messagesRequested = this.messagesRequested.reverse();
        this.maxPageCount = Math.ceil((this.messagesRequested.length + 0.0) / 3);
        console.log(data);
        console.log(this.messagesRequested);
      }
    );
    this.currentCategory = "Inbox : " +  this.messagesRequested.length + "Mails";
  }
  getSent(){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.getSent().subscribe(
      data =>{
        this.messagesRequested = <Array<any>>data;
        this.messagesRequested = this.messagesRequested.reverse();
        this.maxPageCount = Math.ceil((this.messagesRequested.length + 0.0) / 3);
      }
    );
    this.currentCategory = "Sent : " +  this.messagesRequested.length + "Mails";
  }
  getStarred(){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.getStarred().subscribe(
      data =>{
        this.messagesRequested = <Array<any>>data;
        this.messagesRequested = this.messagesRequested.reverse();
        this.maxPageCount = Math.ceil((this.messagesRequested.length + 0.0) / 3);
      }
    );
    this.currentCategory = "Starred : " +  this.messagesRequested.length + "Mails";
    console.log(this.messagesRequested);
  }
  getImportant(){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.getImportant().subscribe(
      data =>{
        this.messagesRequested = <Array<any>>data;
        this.messagesRequested = this.messagesRequested.reverse();
        this.maxPageCount = Math.ceil((this.messagesRequested.length + 0.0) / 3);
      }
    );
    this.currentCategory = "Important : " +  this.messagesRequested.length + "Mails";
  }
  getDraft(){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.getDraft().subscribe(
      data =>{
        this.messagesRequested = <Array<any>>data;
        this.messagesRequested = this.messagesRequested.reverse();
        this.maxPageCount = Math.ceil((this.messagesRequested.length + 0.0) / 3);
      }
    );
    this.currentCategory = "Drafts : " +  this.messagesRequested.length + "Mails";
  }
  getTrashed(){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.getDeleted().subscribe(
      data =>{
        this.messagesRequested = <Array<any>>data;
        this.messagesRequested = this.messagesRequested.reverse();
        this.maxPageCount = Math.ceil((this.messagesRequested.length + 0.0) / 3);
      }
    );
    this.currentCategory = "Trashed : " +  this.messagesRequested.length + "Mails";
  }
  getCustom(){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.getCustom().subscribe(
      data =>{
        this.messagesRequested = <Array<any>>data;
        this.messagesRequested = this.messagesRequested.reverse();
        this.maxPageCount = Math.ceil((this.messagesRequested.length + 0.0) / 3);
      }
    );
    this.currentCategory = "Other Messages : " +  this.messagesRequested.length + "Mails";
  }

  selectContacts(){
    this.currentCategory = "Contacts";
  }
  addContact(user: any){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.addContact(user).subscribe(
      data => {console.log(data);}
    );
  }
  validateContact(user: any){
    let contacts1;

    console.log(this.currentUserEmail);
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.getContacts().subscribe(
      contacts => {
        contacts1 = <Array<any>> contacts;
        console.log(contacts1);
        for(let i = 0; i < contacts1.length; i++){
          if(contacts1[i].name == user.name && contacts1[i].emailAddress == user.emailAddress) return false;
        }
        return true;
      });
    return true;
  }
  deleteContact(user: any){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.deleteContact(user).subscribe(
      data => {console.log(data);}
    );
  }
  setNewName(nameEvent: any){
    this.user.name = (nameEvent.target as HTMLInputElement).value;
  }
  editContact(){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    console.log(this.user);
    this.userBackLink.editContact(this.user).subscribe(
      data => {console.log(data);}
    );
  }

  getMyContacts(){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.getContacts().subscribe(
      contacts => {
        this.usersRequested = <Array<any>> contacts;
        this.usersRequested = this.usersRequested.reverse();
        this.maxPageCount = Math.ceil((this.usersRequested.length + 0.0) / 6);
      }
    );
    this.contactsCategory = "Your Contacts: "+ this.usersRequested.length + " Contacts";
    this.contactsType = "Your Contacts";
  }
  searchAllContacts(searchEvent: any){
    let contactSearchedFor = (searchEvent.target as HTMLInputElement).value;
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.searchAllContacts(contactSearchedFor).subscribe(
      contacts => {
        this.usersRequested = <Array<any>>contacts;
        this.maxPageCount = this.maxPageCount = Math.ceil((this.usersRequested.length + 0.0) / 5);
      }
    );
    this.contactsCategory = "Search Results: " + this.usersRequested.length + " Contacts";
    this.contactsType = "Search Results";
  }
  searchMyContacts(searchEvent: any){
    let contactSearchedFor = (searchEvent.target as HTMLInputElement).value;
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.searchMyContacts(contactSearchedFor).subscribe(
      contacts => {
        this.usersRequested = <Array<any>>contacts;
        this.maxPageCount = this.maxPageCount = Math.ceil((this.usersRequested.length + 0.0) / 5);
      }
    );
    this.contactsCategory = "Search Results: " + this.usersRequested.length + " Contacts";
    this.contactsType = "Search Results from Contacts";
  }



  showMessage(message: any){
    console.log(message);
    this.message = new EmailMessage();
    for(let i = 0; i < this.messagesRequested.length; i++){
      if(this.messagesRequested[i].iD == message.iD){
        this.messagesRequested[i].read = true;
        this.message.setTo(this.messagesRequested[i].to);
        this.message.setFrom(this.messagesRequested[i].from);
        this.message.setBody(this.messagesRequested[i].body);
        this.message.setDate(this.messagesRequested[i].date);
        this.message.setAttachment(this.messagesRequested[i].attachment);
        this.message.setSubject(this.messagesRequested[i].subject);
        console.log(message.iD);
        this.displayMessages();
        this.userBackLink.setUserEmail(this.currentUserEmail);
        this.userBackLink.readMessage(message.iD).subscribe(
          () => {console.log("message read")}
        );
      }
    }
    let composition = <HTMLInputElement> document.getElementById("composeAMessage");
    composition!.style.visibility = 'hidden';
    let filterMessage = document.getElementById("filterMessage");
    filterMessage!.style.visibility = "hidden";
    let messageShown = <HTMLInputElement> document.getElementById("showMessage");
    messageShown!.style.visibility= "visible"
  }
  markMessages(message: any){
    let messageShown = <HTMLInputElement> document.getElementById("showMessage");
    messageShown!.style.visibility= "hidden"
    if(this.messagesMarked.includes(message.iD)){
      let modifiedMarkedMessages : Array<any> = [];
      for(let i = 0; i < this.messagesMarked.length; i++){
        if(this.messagesMarked[i] != message.iD){
          modifiedMarkedMessages.push(this.messagesMarked[i])
        }
      }
      this.messagesMarked = modifiedMarkedMessages;
    }
    else this.messagesMarked.push(message.iD);
    console.log(this.messagesMarked);
  }

  starMessages(){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.starMessages(this.messagesMarked).subscribe(
      () => {console.log("messages starred")}
    );
    this.messagesMarked = [];
  }
  makeMessagesImportant(){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.makeMessagesImportant(this.messagesMarked).subscribe(
      () => {console.log("messages made important")}
    );
    this.messagesMarked = [];
  }
  deleteMessages(){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.deleteMessages(this.messagesMarked).subscribe(
      () => {console.log("messages deleted")}
    );
    this.messagesMarked = [];
  }
  makeMessagesCustom(){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.makeMessagesCustom(this.messagesMarked).subscribe(
      () => {console.log("messages moved to other messages")}
    );
    this.messagesMarked = [];
  }

  unStarMessage(id: string){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.unStarMessage(id).subscribe(
      () => {console.log('unstarred')}
    );
  }
  unImportantMessage(id: string){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.makeMessageUnImportant(id).subscribe(
      () => {console.log('unimportant')}
    );
  }
  unCustomMessage(id: string){
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.makeMessageUnCustom(id).subscribe(
      () => {console.log('unOthered')}
    );
  }


  nonFilteredSearch(nonFilterEvent: any){
    let searchedFor = (nonFilterEvent.target as HTMLInputElement).value;
    console.log(searchedFor);
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.nonFilteredSearch(searchedFor).subscribe(
      data => {
        this.messagesRequested = <Array<any>>data;
        this.maxPageCount = Math.ceil((this.messagesRequested.length + 0.0) / 3);
      }
    );
    this.currentCategory = "Search Results : " + this.messagesRequested.length + " results.";
  }
  filteredSearch(){
    let messageJson = {to: this.message.getTo(), from: this.message.getFrom(),
      subject: this.message.getSubject(), body: this.message.getBody(), date: this.message.getDate(),
      attachment: "", id: ""};
    console.log(messageJson);
    this.userBackLink.setUserEmail(this.currentUserEmail);
    this.userBackLink.filteredSearch(messageJson).subscribe(
      data => {
        this.messagesRequested = <Array<any>>data;
        this.maxPageCount = Math.ceil((this.messagesRequested.length + 0.0) / 3);
      }
    );
    this.currentCategory = "Search Results : " + this.messagesRequested.length + " results.";
    console.log(this.messagesRequested);
  }

  setTo(toEvent: any){
    let typed = ((toEvent.target as HTMLInputElement).value);
    let toArray = typed.split(",")
    this.message.setTo(toArray);
  }
  setFrom(fromEvent: any){this.message.setFrom((fromEvent.target as HTMLInputElement).value);}
  setSubject(subjectEvent: any){this.message.setSubject((subjectEvent.target as HTMLInputElement).value);}
  setBody(bodyEvent: any){this.message.setBody((bodyEvent.target as HTMLInputElement).value);}
  setDate(dateEvent: any){this.message.setDate((dateEvent.target as HTMLInputElement).value);}

  selectAnAttachment(attachEvent: any){
    this.file = attachEvent.target.files[0];
    if(this.file){
      this.fileName = this.file.name;
      this.filePath = "/assets/Attachments/" + this.fileName;
      this.fileType = this.file.type;

      this.formData = new FormData();
      this.formData.append('file', this.file);

      console.log(this.formData.get('file'));
      this.userBackLink.postAttachment(this.formData).subscribe(
        data => {
          console.log(data);
        });

      let viewAttachment = <HTMLInputElement> document.getElementById("attachment");
      viewAttachment.disabled = false;
      let cancelAttachment = <HTMLInputElement> document.getElementById("cancelAttachment");
      cancelAttachment!.style.visibility = 'visible'
    }
  }
  finalDecisionOnEmail(mode: string){
    this.message.setAttachment(this.filePath);
    let date = new Date();
    let id = Math. floor(Math. random() * (1000000000 + 1));
    let email:any = {id : <String><unknown>id, from: this.currentUserEmail, to: this.message.getTo(),
      subject: this.message.getSubject(), body: this.message.getBody(), attachment: this.filePath,
      date: date};
    console.log(email);
    let cancelAttachment = <HTMLInputElement> document.getElementById("cancelAttachment");
    cancelAttachment!.style.visibility = 'hidden'

    if(mode == "send"){
      this.userBackLink.sendEmail(email).subscribe(
        () => {console.log("messageSent")}
      );
    }
    else{
      this.userBackLink.setUserEmail(this.currentUserEmail);
      this.userBackLink.makeDraft(email).subscribe(
        () => {console.log("made draft")}
      );
    }
    this.fileName = '';
    this.filePath = '';
    this.fileType = '';
    this.formData = new FormData();
    this.message = new EmailMessage();
  }

  recomposeMessage(message : any){
    this.message = new EmailMessage();
    this.message.setTo(message.to);
    this.message.setSubject(message.subject);
    this.message.setBody(message.body);
    this.filePath = message.attachment;
    if(this.filePath != '') {
      for(let i = 20; i < this.filePath.length; i++) this.fileName += this.filePath[i];
      let attach = <HTMLInputElement> document.getElementById('attachmentRec');
      attach.disabled = false;
    }

    let composition = <HTMLInputElement> document.getElementById("recomposeAMessage");
    composition!.style.visibility = 'visible';
    let filterMessage = document.getElementById("filterMessage");
    filterMessage!.style.visibility = "hidden";
    let messageShown = document.getElementById("showMessage");
    messageShown!.style.visibility = 'hidden';

  }

  ngOnInit(): void {
  }

  displayMessages() {
    this.messagesToAppear = new Array<any>(0);
    if (this.currentPage <= this.maxPageCount && this.currentPage >= this.minPageCount) {
      for (let i = 0; i < 3; i++){
        let index = 3 * (this.currentPage - 1) + i;
        if(index < this.messagesRequested.length)
          this.messagesToAppear.push(this.messagesRequested[index]);
      }
    }
    console.log(this.messagesToAppear);
    this.pagination();
  }
  displayUsers(){
    this.usersToAppear = new Array<any>(0);
    if (this.currentPage <= this.maxPageCount && this.currentPage >= this.minPageCount) {
      for (let i = 0; i < 5; i++){
        let index = 5 * (this.currentPage - 1) + i;
        if(index < this.usersRequested.length)
          this.usersToAppear.push(this.usersRequested[index]);
      }
    }
    console.log(this.usersToAppear);
    this.pagination();
  }
  pagination(){
    let pageIncrementer = <HTMLInputElement>document.getElementById("inc");
    let pageDecrementer = <HTMLInputElement>document.getElementById("dec");
    if(this.currentPage > this.maxPageCount){
      pageIncrementer.disabled = true;
      pageDecrementer.disabled = true;
    }
    else if(this.currentPage == this.maxPageCount && this.currentPage > this.minPageCount){
      pageIncrementer.disabled = true;
      pageDecrementer.disabled = false;
    }
    else if(this.currentPage < this.maxPageCount && this.currentPage > this.minPageCount){
      pageIncrementer.disabled = false;
      pageDecrementer.disabled = false;
    }
    else if(this.currentPage == this.minPageCount && this.currentPage < this.maxPageCount){
      pageIncrementer.disabled = false;
      pageDecrementer.disabled = true;
    }
  }
  incrementPage(){
    if(this.currentPage + 1 <= this.maxPageCount) this.currentPage++;
    //this.currentPage++;
    console.log(this.currentPage);
    this.pagination();
  }
  decrementPage(){
    if(this.currentPage - 1 >= this.minPageCount) this.currentPage--;
    //this.currentPage--;
    console.log(this.currentPage);
    this.pagination();
  }


  filterButtonClicked(){
    this.message = new EmailMessage();
    let filterMessage = document.getElementById("filterMessage");
    if(filterMessage!.style.visibility == 'visible') filterMessage!.style.visibility = "hidden";
    else filterMessage!.style.visibility = 'visible';
    let composition = <HTMLInputElement> document.getElementById("composeAMessage");
    composition!.style.visibility = 'hidden';
  }
  xButtonClicked(){
    let message = document.getElementById("showMessage");
    message!.style.visibility = 'hidden';
  }
  composeButtonClicked(){
    let composition = <HTMLInputElement> document.getElementById("composeAMessage");
    composition!.style.visibility = 'visible';
    let filterMessage = document.getElementById("filterMessage");
    filterMessage!.style.visibility = "hidden";
    let message = document.getElementById("showMessage");
    message!.style.visibility = 'hidden';
    this.message = new EmailMessage();
  }
  cancelButtonClicked(){
    let composition = <HTMLInputElement> document.getElementById("composeAMessage");
    composition!.style.visibility = 'hidden';
    let recomposition = <HTMLInputElement> document.getElementById("recomposeAMessage");
    recomposition!.style.visibility = 'hidden';
    this.message = new EmailMessage();
  }
  cancelAttachment(){
    this.fileName = '';
    this.filePath = '';
    this.fileType = '';
    this.formData = new FormData();
    let attach = <HTMLInputElement> document.getElementById('attachment');
    attach.disabled = true;
    let attachRec = <HTMLInputElement> document.getElementById('attachmentRec');
    attachRec.disabled = true;
    let cancelAttachment = <HTMLInputElement> document.getElementById("cancelAttachment");
    cancelAttachment!.style.visibility = 'hidden'
  }
  editButtonClicked(user: any){
    let div = <HTMLInputElement> document.getElementById("editContact");
    div!.style.visibility = 'visible';

    this.user = user;
  }
  cancelEditClicked(){
    let div = <HTMLInputElement> document.getElementById("editContact");
    div!.style.visibility = 'hidden';

    this.user = "";
  }

}
