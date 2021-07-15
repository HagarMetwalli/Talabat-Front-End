import { Injectable } from '@angular/core';
import { Client } from './../Models/Client';
const TOKEN_KEY = 'auth-token';
const CLIENT_KEY = 'auth-Client';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveClient(client: Client): void {
    window.sessionStorage.removeItem(CLIENT_KEY);
    window.sessionStorage.setItem(CLIENT_KEY, JSON.stringify(client));
  }

  public getClient(): any {
    const client = window.sessionStorage.getItem(CLIENT_KEY);
    if (client) {
      return JSON.parse(client);
    }

    return {};
  }
}
