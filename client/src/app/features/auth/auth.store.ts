import { Injectable, signal, effect } from '@angular/core';
import { IUserInfo } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private _token: string | null = null;

  public user = signal<IUserInfo | null>(JSON.parse(localStorage.getItem('user') || 'null'));

  constructor() {
    effect(() => {
      const currentUser = this.user();
      if (currentUser) {
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  get token(): string | null {
    if (!this._token) {
      this._token = localStorage.getItem('token');
    }
    return this._token;
  }

  set token(value: string | null) {
    this._token = value;
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
  }

  clearToken() {
    this.token = null;
  }
}
