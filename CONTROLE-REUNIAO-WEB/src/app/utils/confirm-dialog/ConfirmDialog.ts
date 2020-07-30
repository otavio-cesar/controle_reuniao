import { Component, Inject, OnInit, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

//------
// Componente responsável por mostrar caixas de diálogo
//------

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
  styles: []
})
export class DialogComfirm implements OnInit {

  // excluir, etc.
  opcao: string

  constructor(
    public dialogRef: MatDialogRef<DialogComfirm>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log("dialog data", this.data)
    this.opcao = this.data.opcao
  }

  comfirmaAcao() {
    // return confirmacao
    this.dialogRef.close(true)
  }

}
