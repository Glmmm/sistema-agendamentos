import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LugaresService {
  private http = inject(HttpClient);

  // listarLugaresFamosos(): Observable<LugarFamoso[]> {
  // return of(mockLugares).pipe(delay(500));
  // }
}
