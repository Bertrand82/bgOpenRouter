import { Component, ChangeDetectorRef } from '@angular/core';
// Update the import path below if the file name or location is different
import { OpenrouterService, ChatMessage, ChatRequest, ChatResponse }  from './../services/service-open-router-chat';
import { OpenRouterService,OpenRouterModel }                              from './../services/service-open-router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-open-router-chat',
  imports: [CommonModule,
    FormsModule],
  templateUrl: './open-router-chat.html',
  styleUrl: './open-router-chat.css'
})
export class OpenRouterChat {


  prompt = '';
  history: ChatMessage[] = [];
  error = '';
  constructor(private openrouter: OpenrouterService,protected orService: OpenRouterService,private cdr: ChangeDetectorRef) {}

  send() {
    this.error = '';
    if (!this.prompt.trim()) {
      this.error = 'Le message ne peut pas être vide.';
      console.log('Le message est vide, rien à envoyer.');
      return;}

    const userMsg: ChatMessage = { role: 'user', content: this.prompt };
    this.history.push(userMsg);
    if (!this.orService.selectedModel){
      this.error = 'Aucun modèle sélectionné.';
      console.log('Aucun modèle sélectionné, impossible d\'envoyer le message.');
      alert('Aucun modèle sélectionné. Veuillez choisir un modèle avant d\'envoyer un message.');
      return;
    }
    var modelSelected:string = this.orService.selectedModel ? this.orService.selectedModel.id : 'openai/gpt-4o';

    const req: ChatRequest = {
      model: modelSelected, // vous pouvez changer selon le modèle choisi
      messages: this.history.map(m => ({ role: m.role, content: m.content })),
      temperature: 0.7,
      max_tokens: 300
    };
    console.log('Requête envoyée:', req);

    this.openrouter.chat(req).subscribe({
      next: (res: ChatResponse) => {
        console.log('Réponse reçue:', res);
        const assistantMsg = res.choices[0].message;
        this.history.push({ role: assistantMsg.role as any, content: assistantMsg.content });
        this.cdr.detectChanges(); // Force la détection des changements pour mettre à jour l'interface
        console.log('Historique mis à jour:', this.history);
      },
      error: err => {
        console.error('Erreur OpenRouter:', err);
        this.error = 'Erreur : ' + (err.message || 'Erreur inconnue');
        this.cdr.detectChanges();
      }
    });

    this.prompt = '';
  }
}
