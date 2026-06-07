import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from './features/home/components/header';
import { FooterComponent } from './features/home/components/footer';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastModule, ConfirmDialogModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
