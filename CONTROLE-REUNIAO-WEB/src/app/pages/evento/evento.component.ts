import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarNotificationComponent } from '../../utils/snackbar/SnackBar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { DialogComfirm } from '../../utils/confirm-dialog/ConfirmDialog';
import { Evento } from '../../model/Evento';
import { MyErrorStateMatcher } from '../../utils/MyErrorStateMatcher';
import { EventoService } from '../../services/evento.service';
import { DialogCadastroEvento } from './cadastro-evento/cadastro-evento';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  displayedColumnsEvento: string[] = ['Data', 'Sala', 'Inicio', 'Termino', 'Responsavel', 'Editar', 'Excluir']
  dataSourceEvento = new MatTableDataSource<Evento>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private eventoService: EventoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.dataSourceEvento.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSourceEvento.paginator = this.paginator;
    this.dataSourceEvento.sort = this.sort;

    this.atualizaTableEvento()
  }

  // workaround. esses campos falharam na ordenacao mat-sort
  sortDataEvento(sort: Sort) {
    if (sort.active == "Sala")
      this.dataSourceEvento.data = this.dataSourceEvento.data.sort((a, b) =>
        (a.Sala.Nome > b.Sala.Nome ? 1 : -1) * (sort.direction == "asc" ? 1 : -1));
    if (sort.active == "Data")
      this.dataSourceEvento.data = this.dataSourceEvento.data.sort((a, b) =>
        (a.Dia > b.Dia ? 1 : -1) * (sort.direction == "asc" ? 1 : -1));
  }

  atualizaTableEvento() {
    this.eventoService.buscaEvento()
      .subscribe(value => {
        console.log(value)
        this.dataSourceEvento.data = value
      }, error => {
        console.log(error)
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
        this.eventoService.excluir(row.EventoId)
          .subscribe(() => {
            // atualiza table
            this.atualizaTableEvento();
            this._snackBar.openFromComponent(SnackBarNotificationComponent, {
              duration: 2000,
              data: { opcao: "excluido" }
            });
          }, error => {
            console.log(error)
          })
      }
    });
  }

  editarEvento(row: Evento) {
    const dialogRef = this.dialog.open(DialogCadastroEvento, {
      data:
        { evento: row }
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
