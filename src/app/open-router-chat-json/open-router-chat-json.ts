import { ChangeDetectorRef, Component, model } from '@angular/core';
import { ServiceOpenRouterChatJson,ChatCompletionResponse} from '../services/service-open-router-chat-json';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenRouterService } from '../services/service-open-router';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@Component({
  selector: 'app-open-router-chat-json',
  imports: [CommonModule,
    FormsModule,NgxJsonViewerModule,],
  templateUrl: './open-router-chat-json.html',
  styleUrl: './open-router-chat-json.css'
})
export class OpenRouterChatJson {

  userInput = '';
  responseJson: any;
  processing:boolean=false;

  constructor( private openrouter : ServiceOpenRouterChatJson,protected orService: OpenRouterService,private cdr: ChangeDetectorRef)  {
    console.log('OpenRouterChatJson component initialized with service:', openrouter);
  }

  ask() {
    console.log('User input:', this.userInput);
    if (!this.userInput.trim()) {
      console.error('User input is empty, nothing to send.');
      alert('Le prompt ne peut pas être vide.');
      return;
    }
    this.processing = true;
    const modelSelected:string = this.orService.selectedModel ? this.orService.selectedModel.id : 'openai/gpt-4o';


    this.openrouter.sendRequest({
      model: modelSelected,
      messages: [{ role: 'user', content: this.userInput }],
      response_format: {
        type: 'json_schema',
        json_schema: schemaResponse
      }
    }).subscribe({
      next: res => {console.log("response",res)  ;this.processResponse(res);},
      error: err => {console.error(err); this.processing=false; alert('Erreur lors de l\'envoi de la requête : ' + err.message);},
    });
  }
  processResponse(res: ChatCompletionResponse) {
    console.log('Response received:', res)  ;
    this.processing = false;
    for(const choice of res.choices) {
      console.log('Choice:', choice);
      if (choice.message && choice.message.content) {
        const responseJsonStr:string = choice.message.content;
        this.responseJson = JSON.parse(responseJsonStr);
        console.log('Parsed JSON:', this.responseJson);
      } else {
        console.warn('No content in message:', choice.message);
      }
    }

    this.cdr.detectChanges(); // Force la détection des changements pour mettre à jour l
    console.log('Response JSON:', res.choices[0].message.content);
  }



}

const schemaResponse = {
  name: 'responseComplexe',
  strict: true,
  schema: {
    type: 'object',
    properties: {
      promptEquivalent: { type: 'string', description: 'Prompt équivalent mais mieux formulé dans la requête' },
      promptPossible: { type: 'string', description: 'Prompt possible ayant un sens voisin' },
      promptSuivant: { type: 'string', description: 'Prompt suivant' },
      reponse: { type: 'string', description: 'Réponse au prompt' }
    },
    required: ['promptEquivalent', 'promptPossible', 'promptSuivant', 'reponse'],
    additionalProperties: false
  }
};
const schemaResponse_OLD
     = {
      name: 'responseComplexe',
      strict: true,
      schema: {
        type: 'object',
        properties: {
          promptEquivalent: { type: 'string' , description: 'prompt equivalent in the request' },
          promptPossible: { type: 'string' , description: 'prompt possible ayant un sens voisin' },
          promptSuivant: { type: 'string' , description: 'prompt suivant  ' },
          reponse: { type: 'string' , description:"reponse au prompt" },

        },
          promptSuivant: { type: 'string' , description: 'prompt suivant  ' },
        required: ['promptEquivalent', 'promptPossible', 'promptSuivant', 'reponse'],
        additionalProperties: true
      }
    };

export const responseShemaCheckSentence___OLD = {
  "type": "object",
  "properties": {
    "isOK": { "type": "boolean" },
    "isMakeSens": { "type": "boolean" },
    "isFamiliar": { "type": "boolean" },
    "numberOfFaults": { "type": "number" },
    "corrected": { "type": "string" , "description": "Corrected version of the sentence if it was not OK." },
    "otherCorrectProposition": { "type": "string" }
  },
  "required": ["isOK", "isMakeSens", "isFamiliar", "corrected", "numberOfFaults"],
  "propertyOrdering": ["isOK", "isMakeSens", "isFamiliar", "corrected", "otherCorrectProposition"]
};
