import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import {SignUpPageComponent} from "./sign-up-page/sign-up-page.component";
import {LoggerPageComponent} from "./logger-page/logger-page.component";
import { UserPageComponent } from './user-page/user-page.component';
import {HttpClientModule} from "@angular/common/http";
import {UserPageGuardService} from "./confirm-page/user-page-guard.service";
import {LoggerPageGaurdService} from "./logger-page/logger-page-gaurd.service";
import { ConfirmPageComponent } from './confirm-page/confirm-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpPageComponent,
    LoggerPageComponent,
    UserPageComponent,
    ConfirmPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [UserPageGuardService, LoggerPageGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
