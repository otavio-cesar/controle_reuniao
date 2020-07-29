import { AbstractControl, ValidatorFn, FormGroup } from "@angular/forms";
import { formatTimeMillis } from './DateTimeFormat';

export function maiorMenorValidator(menor: string, maior: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let inicioControl = (<FormGroup>control.parent)?.get(menor)
    let terminoControl = (<FormGroup>control.parent)?.get(maior)

    let forbidden = false;

    if (inicioControl && terminoControl) {
      if (formatTimeMillis(inicioControl.value) > formatTimeMillis(terminoControl.value))
        forbidden = true
    }

    return forbidden ? { 'maiorMenor': { value: control.value } } : null;
  };
}
