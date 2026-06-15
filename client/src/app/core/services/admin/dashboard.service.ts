import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDashboardResponse } from '../../../features/admin/models/dashboard-metricas.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly apiUrl = 'http://localhost:8080/api/dashboard';

  private http = inject(HttpClient);

  public listarDashboard() {
    return this.http.get<IDashboardResponse>(`${this.apiUrl}`);
  }

  public confirmarAgendamento(agendamentoId: number) {
    return this.http.post(`${this.apiUrl}/agendamento/${agendamentoId}`, {});
  }
}
