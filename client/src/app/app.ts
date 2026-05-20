import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './features/auth/login';
import { FooterComponent } from './shared/layout/footer';
import { HeaderComponent } from './shared/layout/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
