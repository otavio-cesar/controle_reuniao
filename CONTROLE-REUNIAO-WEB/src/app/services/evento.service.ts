import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Evento } from '../model/Evento';

@Injectable()
export class EventoService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'text/plain' }) };

  private eventoUrl = `${environment.ApiURL}/evento`

  private atualizarEventolUrl = `${this.eventoUrl}/Atualizar`
  private excluirEventolUrl = `${this.eventoUrl}/Excluir`

  constructor(private http: HttpClient) { }

  buscaEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.eventoUrl);
  }

  salvarEvento(evento: Evento): Observable<void> {
    return this.http.post<void>(
      this.eventoUrl,
      evento,
      this.httpOptions
    );
  }

  editarEvento(evento: Evento): Observable<any> {
    return this.http.post(
      `${this.atualizarEventolUrl}`,
      evento,
      this.httpOptions
    );
  }

  excluir(idEvento: number): Observable<any> {
    return this.http.post(
      `${this.excluirEventolUrl}/${idEvento}`,
      {},
      this.httpOptions
    );
  }

}
