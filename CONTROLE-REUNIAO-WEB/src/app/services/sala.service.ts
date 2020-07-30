import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Sala } from '../model/Sala';

@Injectable()
export class SalaService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'text/plain' }) };

  private salaUrl = `${environment.ApiURL}/sala`
  
  private atualizarSalalUrl = `${this.salaUrl}/Atualizar`
  private excluirSalalUrl = `${this.salaUrl}/Excluir`

  constructor(private http: HttpClient) { }

  salvarSala(sala: Sala): Observable<void> {
    console.log(sala)

    return this.http.post<void>(
      this.salaUrl,
      sala,
      this.httpOptions
    );
  }

  editarSala(sala: Sala): Observable<any> {
    console.log(sala)

    return this.http.post(
      `${this.atualizarSalalUrl}`,
      sala,
      this.httpOptions
    );
  }

  excluir(idSala): Observable<any> {
    console.log(idSala)

    return this.http.post(
      `${this.excluirSalalUrl}/${idSala}`,
      {},
      this.httpOptions
    );
  }

}
