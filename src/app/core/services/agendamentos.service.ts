import { Injectable, signal } from '@angular/core';
import { of, delay, Observable } from 'rxjs';
import { Agendamento } from '../../shared/models/movimentacoes.model';
import { mockAgendamentos } from '../../shared/mocks/movimentacoes.mock';

@Injectable({
  providedIn: 'root',
})
export class AgendamentosService {
  constructor() {}

  carregarAgendamentos(): Observable<Agendamento[]> {
    return of(mockAgendamentos).pipe(delay(500));
  }
}
