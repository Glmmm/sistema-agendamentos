import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { DashboardService } from '../../../../core/services/admin/dashboard.service';
import { MessageService } from 'primeng/api';
import { IDashboardResponse } from '../../models/dashboard-metricas.model';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CardModule, ProgressBarModule, TableModule, AvatarModule, DatePipe],
  templateUrl: './dashboard.html',
  styleUrls: [],
})
export class DashboardComponent implements OnInit {
  private service = inject(DashboardService);
  private toast = inject(MessageService);

  metricas = signal<IDashboardResponse>({
    totalPendentes: 0,
    totalConfirmados: 0,
    totalConcluidos: 0,
    faturamentoAtual: 0,
    metaArrecadacao: 0,
    agendamentosDoDia: [],
  });

  porcentagemMeta = computed(() => {
    const atual = this.metricas().faturamentoAtual;
    const meta = this.metricas().metaArrecadacao;
    if (meta <= 0) return 0;
    return Math.min(Math.round((atual / meta) * 100), 100);
  });

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.service.listarDashboard().subscribe({
      next: (value) => {
        this.metricas.set(value);
      },
      error: (err) => {
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao listar métricas',
        });
      },
    });
  }
}
