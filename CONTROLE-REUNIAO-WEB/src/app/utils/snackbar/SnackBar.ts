import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

//------
// Componente para mostrar resultado das ações do usuário
//------

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'mensagem-template.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class SnackBarNotificationComponent implements OnInit {

  //excluido, salvo, editado, etc
  opcao: string

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
    this.opcao = this.data.opcao
  }
}
