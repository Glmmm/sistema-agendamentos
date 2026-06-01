import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/auth';

  public login(form: any) {
    return this.http.post(`${this.apiUrl}/login`, form);
  }

  public register(form: any) {
    return this.http.post(`${this.apiUrl}/register`, form);
  }

  public getUserInfo() {
    return this.http.get(`${this.apiUrl}/user-info`);
  }
}
