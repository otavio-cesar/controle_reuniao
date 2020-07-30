import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Sala } from '../model/Sala';

@Injectable()
export class SalaService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'text/plain' }) };

  private salaUrl = `${environment.ApiURL}/sala`

  constructor(private http: HttpClient) { }

  buscaTodos(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.salaUrl);
  }

}
