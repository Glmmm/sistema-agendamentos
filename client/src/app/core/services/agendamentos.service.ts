import { Injectable, signal } from '@angular/core';
import { of, delay, Observable } from 'rxjs';
import { Agendamento } from '../../shared/models/cadastros.model';
import { MOCK_AGENDAMENTOS } from '../../shared/mocks/cadastros.mock';

@Injectable({
  providedIn: 'root',
})
export class AgendamentosService {
  constructor() {}

  listarAgendamentos(): Observable<Agendamento[]> {
    return of(MOCK_AGENDAMENTOS).pipe(delay(500));
  }
}
