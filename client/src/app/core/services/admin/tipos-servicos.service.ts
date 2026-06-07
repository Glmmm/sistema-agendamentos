import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITipoServico } from '../../../features/admin/models/tipo-servicos.model';
import { ITipoServicoResponse } from '../../../features/admin/models/tipo-servicos-response.model';

@Injectable({
  providedIn: 'root',
})
export class TiposServicosService {
  private readonly tiposServicosUrl = 'http://localhost:8080/api/admin/tipos-servicos';

  private http = inject(HttpClient);

  public getServicosByProfissional(profissionalId: number) {
    return this.http.get<ITipoServicoResponse[]>(
      `${this.tiposServicosUrl}/profissional/${profissionalId}`,
    );
  }

  public createServico(servicoData: any) {
    return this.http.post(this.tiposServicosUrl, servicoData);
  }

  public deleteServico(servicoId: number) {
    return this.http.delete(`${this.tiposServicosUrl}/${servicoId}`);
  }

  public updateServico(servicoId: number, servicoData: any) {
    return this.http.put(`${this.tiposServicosUrl}/${servicoId}`, servicoData);
  }
}
