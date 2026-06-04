import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProfissionalResponse } from '../../../features/admin/models/profissionais-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProfissionaisService {
  private readonly profissionaisUrl = 'http://localhost:8080/api/admin/profissionais';

  private http = inject(HttpClient);

  public getProfissionalByEmpresa(empresaId: number) {
    return this.http.get<IProfissionalResponse[]>(`${this.profissionaisUrl}/empresa/${empresaId}`);
  }

  public getProfissionaisById(profissionalId: number) {
    return this.http.get<IProfissionalResponse>(`${this.profissionaisUrl}/${profissionalId}`);
  }

  public createProfissional(profissionalData: any) {
    return this.http.post(`${this.profissionaisUrl}`, profissionalData);
  }

  public deleteProfissional(profissionalId: number) {
    return this.http.delete(`${this.profissionaisUrl}/${profissionalId}`);
  }

  public updateProfissional(profissionalId: number, profissionalData: any) {
    return this.http.put(`${this.profissionaisUrl}/${profissionalId}`, profissionalData);
  }
}
