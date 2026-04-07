import { Component, inject, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ServicosService } from '../../../../core/services/servicos.service';
import { ServicoPassado } from '../../../../shared/models/movimentacoes.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicos',
  imports: [CardModule, CommonModule],
  templateUrl: './servicos.html',
  styles: ``,
})
export class ServicosComponent implements OnInit {
  private service = inject(ServicosService);

  servicosPassados = signal<ServicoPassado[]>([]);
  ngOnInit(): void {
    this.service.listarServicosPassados().subscribe((response) => {
      this.servicosPassados.set(response);
    });
  }
}
