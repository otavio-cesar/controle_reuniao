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
    this.loadingService.missionAnnounced$.subscribe(
      stateLoading => {
        this.showLoading = stateLoading
      });

    this.loadingService.missionConfirmed$.subscribe(
      stateLoading => {
        this.showLoading = stateLoading
      });
  }

}
