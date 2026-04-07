import { Component, inject, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AgendamentosService } from '../../../../core/services/agendamentos.service';
import { DatePipe } from '@angular/common';
import { Agendamento } from '../../../../shared/models/movimentacoes.model';

@Component({
  selector: 'app-agendamentos',
  imports: [CardModule, DatePipe],
  templateUrl: './agendamentos.html',
})
export class AgendamentosComponent implements OnInit {
  service = inject(AgendamentosService);
  agendamentos = signal<Agendamento[]>([]);

  ngOnInit(): void {
    this.service.carregarAgendamentos().subscribe((agendamentos) => {
      this.agendamentos.set(agendamentos);
    });
  }
}
