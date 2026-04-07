import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { LugarFamoso } from '../../../../shared/models/movimentacoes.model';
import { LugaresService } from '../../../../core/services/lugares.service';

@Component({
  selector: 'app-lugares-famosos',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './lugares-famosos.html',
  styles: `
    :host {
      display: block;
      padding: 1rem;
    }
  `,
})
export class LugaresFamososComponent implements OnInit {
  private service = inject(LugaresService);

  lugares = signal<LugarFamoso[]>([]);

  ngOnInit(): void {
    this.service.listarLugaresFamosos().subscribe({
      next: (response) => {
        this.lugares.set(response);
      },
      error: (err) => console.error('Erro ao carregar lugares:', err),
    });
  }
}
