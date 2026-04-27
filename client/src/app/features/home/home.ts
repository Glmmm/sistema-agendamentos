import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule, DividerModule, RippleModule],
  templateUrl: './home.html',
})
export class HomeComponent {
  router = inject(Router);
}
