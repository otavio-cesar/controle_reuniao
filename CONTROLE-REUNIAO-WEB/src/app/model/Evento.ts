import { Sala } from "./Sala"
import { Time } from "@angular/common"

export class Evento {

  constructor() { }

  EventoId: number
  Dia: Date
  Inicio: Time
  Termino: Time
  Responsavel: string
  
  SalaId: number
  Sala: Sala
}
