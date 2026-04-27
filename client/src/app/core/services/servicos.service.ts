import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServicosService {
  private http = inject(HttpClient);

  // listarServicosPassados(): Observable<ServicoPassado[]> {
  // return of(mockServicosPassados).pipe(delay(500));
  // }
}
