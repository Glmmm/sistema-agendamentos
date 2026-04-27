import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  imports: [CardModule, DividerModule],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {}
