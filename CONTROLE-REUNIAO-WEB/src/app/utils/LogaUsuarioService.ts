
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LogaUsuarioService {

  // Observable string sources
  private logaUsuarioSource = new Subject<boolean>();

  // Observable string streams
  logaUsuarioAnnounced$ = this.logaUsuarioSource.asObservable();

  // Service message commands
  logaUsuario() {
    setTimeout(() => {
      this.logaUsuarioSource.next(true);
    })
  }
}
