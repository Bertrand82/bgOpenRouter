
import ServiceOpenRouterIdentification, { handleCallback } from './../services/service-open-router-identification';
import { Component ,ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-bg-login',
  imports: [],
  templateUrl: './bg-login.html',
  styleUrl: './bg-login.css',
})
export class BgLogin {
  apiKey!: string ;
  userId!: string;


  serviceOpenRouter: ServiceOpenRouterIdentification

  constructor(serviceOpenRouter: ServiceOpenRouterIdentification) {
    this.serviceOpenRouter = serviceOpenRouter;
    console.log('BgLogin component initialized ',serviceOpenRouter);
    const urlParams = new URLSearchParams(window.location.search);


  }

  displayKeyAndUserId() {
  this.apiKey = localStorage.getItem('apiKey') || 'no API Key';
  this.userId = localStorage.getItem('userId') || 'no User ID';
    console.log('API Key:', this.apiKey);
    console.log('User ID:', this.userId);
}


  protected login2() {
    console.log('Login2 button clicked');
    this.serviceOpenRouter.startAuth();
  }





} /////////////////////////////////////////////////////////////

