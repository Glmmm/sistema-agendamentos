import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: [],
  imports: [RouterOutlet, RouterLink, CardModule],
})
export class AdminComponent {}
