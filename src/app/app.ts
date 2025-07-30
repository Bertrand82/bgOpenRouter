import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BgLogin } from "./bg-login/bg-login";
import { OpenRouterListModels } from "./open-router-list-models/open-router-list-models";
import { OpenRouterChat } from "./open-router-chat/open-router-chat";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BgLogin, OpenRouterListModels, OpenRouterChat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected title = 'bgOpenRouter';

  showParams() {
    const location = window.location;
    console.log('window.location:', location);
    console.log('window.location.href', location.href);
    console.log('window.location.search', location.search);
    console.log('window',window);
    alert('window.location.href: ' + window.location.href + '\n');
  }

}


