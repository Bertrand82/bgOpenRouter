import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BgLogin } from "./bg-login/bg-login";
import { OpenRouterListModels } from "./open-router-list-models/open-router-list-models";
import { OpenRouterChat } from "./open-router-chat/open-router-chat";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BgLogin, OpenRouterListModels, OpenRouterChat, ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected title = 'bgOpenRouter';


}


