import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private _token: string | null = null;

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
