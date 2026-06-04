import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICargaHorariaResponse } from '../../../features/admin/models/cargas.horarias-response.model';
import { ICargaHoraria } from '../../../features/admin/models/cargas-horarias.model';

@Injectable({
  providedIn: 'root',
})
export class CargasHorariasService {
  private readonly cargasHorariasUrl = 'http://localhost:8080/api/admin/cargas-horarias';

  private http = inject(HttpClient);

  public getCargasHorarias() {
    return this.http.get<ICargaHorariaResponse[]>(this.cargasHorariasUrl);
  }

  public getCargasHorariasByProfissional(profissionalId: number) {
    return this.http.get<ICargaHorariaResponse[]>(
      `${this.cargasHorariasUrl}/profissional/${profissionalId}`,
    );
  }

  public createCargaHoraria(cargaHorariaData: ICargaHoraria) {
    return this.http.post<ICargaHorariaResponse>(this.cargasHorariasUrl, cargaHorariaData);
  }

  public deleteCargaHoraria(cargaHorariaId: number) {
    return this.http.delete(`${this.cargasHorariasUrl}/${cargaHorariaId}`);
  }

  public updateCargaHoraria(cargaHorariaId: number, cargaHorariaData: ICargaHoraria) {
    return this.http.put<ICargaHorariaResponse>(
      `${this.cargasHorariasUrl}/${cargaHorariaId}`,
      cargaHorariaData,
    );
  }
}
