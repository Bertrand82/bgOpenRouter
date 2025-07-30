
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  model?: string;
  messages: ChatMessage[];
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}

export interface ChatChoice {
  message: { role: string; content: string };
  finish_reason?: string;
}

export interface ChatResponse {
  id: string;
  model: string;
  choices: ChatChoice[];
  usage?: any;
}

@Injectable({
  providedIn: 'root'
})
export class OpenrouterService {
  private apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  private apiKey = 'VOTRE_CLE_API_OPENROUTER'; // ou mieux : injecté depuis le backend

  constructor(private http: HttpClient) {}

  chat(request: ChatRequest): Observable<ChatResponse> {
    var key2 = sessionStorage.getItem('apiKey');
    if (key2) {
      this.apiKey = key2; // Utiliser la clé API stockée dans sessionStorage
    }
    const headers = new HttpHeaders({

      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
      // Optionnel : 'HTTP-Referer': '<Votre App URL>',
      // Optionnel : 'X-Title': '<Nom de l’App>'
    });

    return this.http.post<ChatResponse>(this.apiUrl, request, { headers });
  }
}

