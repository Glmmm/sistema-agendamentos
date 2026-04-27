import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/ui/header';
import { LoginComponent } from './core/components/login';
import { FooterComponent } from './shared/ui/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
