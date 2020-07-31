import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CONTROLE DE EVENTOS';

  showLoading = false;

  constructor(
    public router: Router,
    private loadingService: LoadingService,
  ) {
    this.loadingConfig();
  }

  ngOnInit() { }

  loadingConfig() {
    // Cria um subscribe ao iniciar requisição. Mostra então loading.
    this.loadingService.requestAnnounced$.subscribe(stateLoading => { this.showLoading = stateLoading });

    // Cria um subscribe ao finalizar requisição. Esconde então loading.
    this.loadingService.responseConfirmed$.subscribe(stateLoading => { this.showLoading = stateLoading });
  }

}
