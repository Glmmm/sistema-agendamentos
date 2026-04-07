import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { mockServicosPassados } from '../../shared/mocks/movimentacoes.mock';
import { delay, Observable, of } from 'rxjs';
import { ServicoPassado } from '../../shared/models/movimentacoes.model';

@Injectable({ providedIn: 'root' })
export class ServicosService {
  private http = inject(HttpClient);

  listarServicosPassados(): Observable<ServicoPassado[]> {
    return of(mockServicosPassados).pipe(delay(500));
  }
}
