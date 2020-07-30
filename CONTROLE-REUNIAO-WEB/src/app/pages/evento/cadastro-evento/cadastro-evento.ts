import { Component, Inject, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyErrorStateMatcher } from '../../../utils/MyErrorStateMatcher';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventoService } from '../../../services/evento.service';
import { SalaService } from '../../../services/sala.service';
import { Evento } from '../../../model/Evento';
import { Sala } from '../../../model/Sala';
import { LoadingService } from '../../../services/loading.service';
import { formatTime, timeToString } from '../../../utils/DateTimeFormat';
import { startWith, map } from 'rxjs/operators';
import { maiorMenorValidator } from '../../../utils/Validators';

@Component({
  selector: 'cadastro-evento',
  templateUrl: 'cadastro-evento.html',
  styleUrls: ['cadastro-evento.css']
})
export class DialogCadastroEvento implements OnInit {

  minDate: Date;
  maxDate: Date;

  horaInicioMaiorTermino: boolean = false

  matcher = new MyErrorStateMatcher();

  salas: Sala[] = [];
  filteredSalas: Observable<Sala[]>;

  totalHoras = "";

  eventoForm = new FormGroup({
    dataFormControl: new FormControl('', [
      Validators.required,
    ]),
    inicioFormControl: new FormControl('', [
      Validators.required,
      Validators.pattern("^([0-1][0-9]|[2][0-3]):([0-5][0-9])$"),
      maiorMenorValidator('inicioFormControl', 'terminoFormControl')

    ]),
    terminoFormControl: new FormControl('', [
      Validators.required,
      Validators.pattern("^([0-1][0-9]|[2][0-3]):([0-5][0-9])$"),
      maiorMenorValidator('inicioFormControl', 'terminoFormControl')
    ]),
    salaFormControl: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogCadastroEvento>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loadingService: LoadingService,
    private eventoService: EventoService,
    private salaService: SalaService,
  ) {
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  ngOnInit(): void {
    if (!this.data.evento) {
      this.loadSalas()
    } else {
      this.loadSalas(this.data.evento.SalaId)
    }
    this.dialogRef.disableClose = true;
  }

  completaDadosParaEdicao() {
    let evento = <Evento>this.data.evento

    this.eventoForm.controls.dataFormControl.setValue(new Date(evento.Dia))
    this.eventoForm.controls.inicioFormControl.setValue(formatTime(evento.Inicio))
    this.eventoForm.controls.terminoFormControl.setValue(formatTime(evento.Termino))

    // atualiza campos automaticos
    this.dateTimeChange()
  }

  filterSala(value: string): Sala[] {
    const filterValue = value.toLowerCase();
    return this.salas.filter(option => option.Nome.toLowerCase().indexOf(filterValue) === 0);
  }

  loadSalas(idSalaFromEdicao?) {
    this.loadingService.showLoading()

    this.salaService.buscaTodos().subscribe(retorno => {
      console.log(retorno)
      this.salas = retorno.map((x) => x)

      this.filteredSalas = this.eventoForm.controls.salaFormControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterSala(value))
      );

      this.loadingService.hideLoading()

      if (idSalaFromEdicao) {
        this.eventoForm.controls.salaFormControl.setValue(this.findSalaById(idSalaFromEdicao).Nome)
      }
    }, error => {
      console.log(error)
      this.loadingService.hideLoading()
    })
  }

  findSalaById(id): Sala {
    console.log(id)
    console.log(this.salas.find(x => x.SalaId == id))
    return this.salas.find(x => x.SalaId == id);
  }

  salaBlur() {
    let sala = this.salas.find(x => x.Nome == this.eventoForm.controls.salaFormControl.value);

    if (!sala)
      this.eventoForm.controls.salaFormControl.setValue("");
  }

  dateTimeChange() {
    let data = this.eventoForm.controls.dataFormControl.value._d ?? this.eventoForm.controls.dataFormControl.value
    let inicio = this.eventoForm.controls.inicioFormControl.value
    let fim = this.eventoForm.controls.terminoFormControl.value

    // ser o digitar o termino por ultimo, atualiza validacao inicio
    this.eventoForm.controls.inicioFormControl.updateValueAndValidity()
    this.eventoForm.controls.terminoFormControl.updateValueAndValidity()
  }

  salvarEventoSubmit() {
    console.log(this.eventoForm)
    if (!this.eventoForm.valid)
      return

    let sala = this.salas.find(x => x.Nome == this.eventoForm.controls.salaFormControl.value)
    let data = this.eventoForm.controls.dataFormControl.value._d ?? this.eventoForm.controls.dataFormControl.value

    let evento: Evento = {
      EventoId: this.data.evento?.EventoId,
      Dia: data,
      Inicio: this.eventoForm.controls.inicioFormControl.value,
      Termino: this.eventoForm.controls.terminoFormControl.value,
      SalaId: sala?.SalaId,
      Sala: undefined,
    }

    if (this.data.funcionario && !this.data.evento) {
      // save data
      this.loadingService.showLoading()
      this.eventoService.salvarEvento(evento).subscribe(() => {
        this.loadingService.hideLoading()
        this.dialogRef.close(true)
      }, error => {
        this.loadingService.hideLoading()
      });
    } else {
      // edita data
      this.loadingService.showLoading()
      this.eventoService.editarEvento(evento).subscribe(() => {
        this.loadingService.hideLoading()
        this.dialogRef.close(true)
      }, error => {
        this.loadingService.hideLoading()
      });
    }
  }

}
