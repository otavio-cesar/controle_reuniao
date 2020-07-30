import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoComponent } from './pages/evento/evento.component'

const routes: Routes = [
  {
    path: '', redirectTo: 'evento', pathMatch: 'full',
  },
  { path: 'evento', component: EventoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
