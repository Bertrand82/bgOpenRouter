import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export default class ServiceOpenRouterIdentification {

  code: string = 'no';
  codeVerifier: string='no';
  apiKey: string  = 'no';
  userId: string  = 'no';
  codeChallenge: string  = 'no';
  hashBuffer: ArrayBuffer | null = null;

  public async startAuth() {
    console.log('Starting authentication with OpenRouter');
    this.codeVerifier = generateCodeVerifier(64);
    this.codeChallenge = await generateCodeChallenge(this.codeVerifier);

    sessionStorage.setItem('pkce_code_verifier', this.codeVerifier);

    const authUrl = new URL('https://openrouter.ai/auth');
    authUrl.searchParams.set('callback_url', 'http://localhost:4200/callback');
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('code_challenge', this.codeChallenge);
    authUrl.searchParams.set('code_challenge_method', 'S256');
    // … + client_id, scope, state, etc.

    window.location.href = authUrl.toString();
  }

}

/** Génère un `code_verifier` aléatoire (43‑128 chars selon RFC 7636) */
function generateCodeVerifier(length = 64): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((c) => chars[c % chars.length])
    .join('');
}

/** Calcule le hash SHA‑256 et encode en Base64‑URL sans padding */
async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = new Uint8Array(hashBuffer);
  let str = '';
  for (const byte of hashArray) {
    str += String.fromCharCode(byte);
  }
  const b64 = btoa(str);
  // conversion Base64 → Base64-URL sans padding
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function  handleCallback(): Promise<any> {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const codeVerifier = sessionStorage.getItem('pkce_code_verifier') || '';
    console.log('B Code from callback codeVerifier:', codeVerifier);
    console.log('B Code from callback code:', code);
    // supprimer stockage pour sécurité
    //sessionStorage.removeItem('pkce_code_verifier');

    if (code && codeVerifier) {
      const bodyString = JSON.stringify({
        code: code,
        code_verifier: codeVerifier,
        code_challenge_method: 'S256',
      });
      console.log('B Request body:', bodyString);
      const resp = await fetch('https://openrouter.ai/api/v1/auth/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyString,
      });

      console.log('B Response from OpenRouterA resp:', resp);
      const data = await resp.json();
      console.log('B Response from OpenRouterB resp:', resp);
      console.log('B Response from OpenRouterC data:', data);
      console.log('B Response from OpenRouterC data.key:', data.key);
      console.log('B Response from OpenRouterC data.user_id:', data.user_id);
      const apiKey = data.key; // clé API utilisateur
      sessionStorage.setItem('apiKey', data.key); // stocker la clé API
      sessionStorage.setItem('userId', data.user_id); // stocker l'ID utilisateur
      console.log('B API Key stored in sessionStorage B:', data.key);

      const userId = data.user_id; // ID utilisateur
      sessionStorage.setItem('userId', data.user_id);
      console.log('B User ID stored in sessionStorage:', data.user_id);
      return data; // clé API utilisateur

    }else {
      console.error('Code or verifier missing in callback');
      throw new Error('Code or verifier missing in callback');

    }

  }

