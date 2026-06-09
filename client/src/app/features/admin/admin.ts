import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: [],
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CardModule],
})
export class AdminComponent {}
