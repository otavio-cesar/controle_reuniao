import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarNotificationComponent } from '../../utils/snackbar/SnackBar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { comparacaoTime } from '../../utils/DateTimeFormat';
import { DialogComfirm } from '../../utils/confirm-dialog/ConfirmDialog';
import { Evento } from '../../model/Evento';
import { MyErrorStateMatcher } from '../../utils/MyErrorStateMatcher';
import { LoadingService } from '../../services/loading.service';
import { EventoService } from '../../services/evento.service';
import { DialogCadastroEvento } from './cadastro-evento/cadastro-evento';

@Component({
  selector: 'app-evento-compensada',
  templateUrl: './evento-compensada.component.html',
  styleUrls: ['./evento-compensada.component.css']
})
export class EventoComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  displayedColumnsEvento: string[] = ['Data', 'Sala', 'Inicio', 'Termino', 'Responsavel', 'Editar', 'Excluir']
  dataSourceEvento = new MatTableDataSource<Evento>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private loadingService: LoadingService,
    private eventoService: EventoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.dataSourceEvento.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSourceEvento.paginator = this.paginator;
    this.dataSourceEvento.sort = this.sort;
  }

  // workaround. esses campos falharam na ordenacao mat-sort
  sortDataEvento(sort: Sort) {
   
  }

  atualizaTableEvento() {
    this.loadingService.showLoading();
    this.eventoService.buscaEvento()
      .subscribe(value => {
        console.log(value)
        this.dataSourceEvento.data = value
        this.loadingService.hideLoading();
      }, error => {
        console.log(error)
        this.loadingService.hideLoading();
      });
  }

  cadastrarEvento() {
      const dialogRef = this.dialog.open(DialogCadastroEvento);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if (result) {
          this._snackBar.openFromComponent(SnackBarNotificationComponent, {
            duration: 2000,
            data: { opcao: "salvo" }
          });
          // atualiza table
          this.atualizaTableEvento();
        }
      });
  }

  excluirEvento(row: Evento) {
    const dialogRef = this.dialog.open(DialogComfirm, {
      data:
        { opcao: "excluir" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadingService.showLoading();
        this.eventoService.excluir(row.EventoId)
          .subscribe(() => {
            this.loadingService.hideLoading();
            // atualiza table
            this.atualizaTableEvento();
            this._snackBar.openFromComponent(SnackBarNotificationComponent, {
              duration: 2000,
              data: { opcao: "excluido" }
            });
          }, error => {
            console.log(error)
            this.loadingService.hideLoading();
          })
      }
    });
  }

  editarEvento(row: Evento) {
    const dialogRef = this.dialog.open(DialogCadastroEvento, {
      data:
        { horaCompensada: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this._snackBar.openFromComponent(SnackBarNotificationComponent, {
          duration: 2000,
          data: { opcao: "editado" }
        });
        // atualiza table
        this.atualizaTableEvento();
      }
    });
  }
  
}
