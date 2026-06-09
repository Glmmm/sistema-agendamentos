import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHomeResponse } from '../../../features/client/models/home-response.model';
import { IEmpresaResumo } from '../../../features/client/models/empresa-resumo.model';
import { IProfissionalResumo } from '../../../features/client/models/profissional-resumo.model';
import { ITipoServicoResumo } from '../../../features/client/models/tipo-servico-resumo.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/catalogo';

  getHomeData(clienteId: number): Observable<IHomeResponse> {
    return this.http.get<IHomeResponse>(`${this.apiUrl}/${clienteId}`);
  }

  getEmpresas(): Observable<IEmpresaResumo[]> {
    return this.http.get<IEmpresaResumo[]>(`${this.apiUrl}/empresas`);
  }

  getProfissionaisPorEmpresa(empresaId: number): Observable<IProfissionalResumo[]> {
    return this.http.get<IProfissionalResumo[]>(
      `${this.apiUrl}/empresas/${empresaId}/profissionais`,
    );
  }

  getHorariosDisponiveis(profissionalId: number, data: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.apiUrl}/profissionais/${profissionalId}/disponibilidade`,
      { params: { data } },
    );
  }

  getServicosPorProfissional(profissionalId: number): Observable<ITipoServicoResumo[]> {
    return this.http.get<ITipoServicoResumo[]>(
      `${this.apiUrl}/profissionais/${profissionalId}/servicos`,
    );
  }

  realizarAgendamento(form: any) {
    return this.http.post(`${this.apiUrl}/agendamento`, form);
  }
}
