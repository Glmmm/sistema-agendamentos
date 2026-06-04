import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly authUrl = 'http://localhost:8080/api/auth';

  public login(form: any) {
    return this.http.post(`${this.authUrl}/login`, form);
  }

  public register(form: any) {
    return this.http.post(`${this.authUrl}/register`, form);
  }

  public getUserInfo() {
    return this.http.get(`${this.authUrl}/user-info`);
  }
}
