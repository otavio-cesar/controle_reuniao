
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoadingService {

  pilha: any[] = []

  // Observable string sources
  private showLoadingSource = new Subject<boolean>();
  private hideLoadingSource = new Subject<boolean>();

  // Observable string streams
  missionAnnounced$ = this.showLoadingSource.asObservable();
  missionConfirmed$ = this.hideLoadingSource.asObservable();

  // Service message commands
  showLoading() {
    this.pilha.push('')

    if (this.pilha.length == 1) {
      setTimeout(() => {
        this.showLoadingSource.next(true);
      })
    }
  }

  hideLoading() {
    this.pilha.pop()

    if (this.pilha.length == 0)
      setTimeout(() => {
        this.hideLoadingSource.next(false);
      })
  }
}
