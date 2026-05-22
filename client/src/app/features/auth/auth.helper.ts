import { Injectable, signal } from '@angular/core';
import { IUser } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthHelper {
  user = signal<IUser | null>(null);

  setUser(user: IUser | null) {
    this.user.set(user);
  }
}
