import { Component, OnInit, inject, signal } from '@angular/core';
import { CatalogoService } from '../../../../core/services/client/catalogo.service';
import { IHomeResponse } from '../../models/home-response.model';
import { DatePipe } from '@angular/common';
import { AuthStore } from '../../../auth/auth.store';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-catalogo',
  imports: [DatePipe, RouterLink, ButtonModule, BadgeModule, CardModule],
  templateUrl: `./catalogo.html`,
})
export class CatalogoComponent implements OnInit {
  public store = inject(AuthStore);
  private catalogService = inject(CatalogoService);
  homeData = signal<IHomeResponse | null>(null);

  ngOnInit(): void {
    const id = this.store.user()?.data.id!;
    this.catalogService.getHomeData(id).subscribe((data) => {
      this.homeData.set(data);
    });
  }
}
