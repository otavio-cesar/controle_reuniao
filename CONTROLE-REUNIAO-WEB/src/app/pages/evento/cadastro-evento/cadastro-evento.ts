import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyErrorStateMatcher } from '../../../utils/MyErrorStateMatcher';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventoService } from '../../../services/evento.service';
import { SalaService } from '../../../services/sala.service';
import { Evento } from '../../../model/Evento';
import { Sala } from '../../../model/Sala';
import { formatTime } from '../../../utils/DateTimeFormat';
import { startWith, map } from 'rxjs/operators';
import { maiorMenorValidator } from '../../../utils/Validators';

@Component({
  selector: 'cadastro-evento',
  templateUrl: 'cadastro-evento.html',
  styleUrls: ['cadastro-evento.css']
})
export class DialogCadastroEvento implements OnInit {

  showAvisoDisponibilidade = false

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
    salaFormControl: new FormControl('', Validators.required),
    responsavelFormControl: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogCadastroEvento>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventoService: EventoService,
    private salaService: SalaService,
  ) {
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  ngOnInit(): void {
    if (!this.data) {
      this.loadSalas()
    } else {
      this.loadSalas(this.data.evento.SalaId)
      this.completaDadosParaEdicao()
    }
    this.dialogRef.disableClose = true;

  }

  completaDadosParaEdicao() {
    let evento = <Evento>this.data.evento

    this.eventoForm.controls.dataFormControl.setValue(new Date(evento.Dia))
    this.eventoForm.controls.inicioFormControl.setValue(formatTime(evento.Inicio))
    this.eventoForm.controls.terminoFormControl.setValue(formatTime(evento.Termino))
    this.eventoForm.controls.responsavelFormControl.setValue(evento.Responsavel)

    // atualiza campos automaticos
    this.dateTimeChange()
  }

  filterSala(value: string): Sala[] {
    const filterValue = value.toLowerCase();
    return this.salas.filter(option => option.Nome.toLowerCase().indexOf(filterValue) === 0);
  }

  loadSalas(idSalaFromEdicao?) {
    this.salaService.buscaTodos().subscribe(retorno => {
      this.salas = retorno.map((x) => x)

      this.filteredSalas = this.eventoForm.controls.salaFormControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterSala(value))
      );

      if (idSalaFromEdicao) {
        this.eventoForm.controls.salaFormControl.setValue(this.findSalaById(idSalaFromEdicao).Nome)
      }
    }, error => {
      console.log(error)
    })
  }

  findSalaById(id): Sala {
    return this.salas.find(x => x.SalaId == id);
  }

  // verifica se sala digitada é válida e se está disponível.
  verificaSelecaoEDisponibilidade() {
    let sala = this.salas.find(x => x.Nome == this.eventoForm.controls.salaFormControl.value);

    if (!sala) {
      this.eventoForm.controls.salaFormControl.setValue("");
    } else {
      // se horario ainda não é valido, não verifica disponibilidade
      if (!this.eventoForm.controls.dataFormControl.valid || !this.eventoForm.controls.inicioFormControl.valid || !this.eventoForm.controls.terminoFormControl.valid)
        return;

      let data = this.eventoForm.controls.dataFormControl.value._d ?? this.eventoForm.controls.dataFormControl.value
      let inicio = this.eventoForm.controls.inicioFormControl.value
      let fim = this.eventoForm.controls.terminoFormControl.value

      let evento: Evento = {
        Dia: new Date(data),
        Inicio: inicio,
        Termino: fim,
        SalaId: sala.SalaId,
        EventoId: this.data?.evento.EventoId,
        Sala: undefined,
        Responsavel: undefined
      };

      this.salaService.isSalaDisponivel(evento).subscribe(
        retorno => {
          this.showAvisoDisponibilidade = !retorno.disponivel
        }, error => {
          console.log(error)
        });
    }
  }

  dateTimeChange() {
    // ser o digitar o termino por ultimo, atualiza validacao inicio
    this.eventoForm.controls.inicioFormControl.updateValueAndValidity()
    this.eventoForm.controls.terminoFormControl.updateValueAndValidity()

    // verifica se sala esta disponivel
    this.verificaSelecaoEDisponibilidade()
  }

  salvarEventoSubmit() {
    if (!this.eventoForm.valid)
      return

    let sala = this.salas.find(x => x.Nome == this.eventoForm.controls.salaFormControl.value)
    let data = this.eventoForm.controls.dataFormControl.value._d ?? this.eventoForm.controls.dataFormControl.value

    let evento: Evento = {
      EventoId: this.data?.evento.EventoId,
      Dia: data,
      Inicio: this.eventoForm.controls.inicioFormControl.value,
      Termino: this.eventoForm.controls.terminoFormControl.value,
      SalaId: sala?.SalaId,
      Sala: undefined,
      Responsavel: this.eventoForm.controls.responsavelFormControl.value
    }

    if (!this.data) {
      // save data
      this.eventoService.salvarEvento(evento).subscribe(() => {
        this.dialogRef.close(true)
      }, error => {
      });
    } else {
      // edita data
      this.eventoService.editarEvento(evento).subscribe(() => {
        this.dialogRef.close(true)
      }, error => {
      });
    }
  }

}
