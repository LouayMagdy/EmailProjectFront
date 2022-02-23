import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoggerPageComponent} from "./logger-page/logger-page.component";
import {SignUpPageComponent} from "./sign-up-page/sign-up-page.component";
import {UserPageComponent} from "./user-page/user-page.component";
import {UserPageGuardService} from "./confirm-page/user-page-guard.service";
import {LoggerPageGaurdService} from "./logger-page/logger-page-gaurd.service";
import {ConfirmPageComponent} from "./confirm-page/confirm-page.component";

const routes: Routes = [
  // {path: "", component: LoggerPageComponent, canActivate: [LoggerPageGaurdService]},
  // {path: "sign-up", component: SignUpPageComponent},
  // {path: "confirm", component: ConfirmPageComponent, canActivate: [UserPageGuardService],
  // children: [
  //   {path: ":userEmail", component: UserPageComponent}
  // ]
  // }

  {path: 'logger', component: LoggerPageComponent, canActivate: [LoggerPageGaurdService]},
  {path: "sign-up", component: SignUpPageComponent},
  {path: "confirm", component: ConfirmPageComponent, canActivate: [UserPageGuardService]},
  {path: ":userEmail", component: UserPageComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
