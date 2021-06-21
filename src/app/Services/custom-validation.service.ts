import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {
   
    constructor() { }

    MatchPassword( AC: AbstractControl) {
    let password = AC.get('clientPassword')?.value;
    if(AC.get('cclientPassword')?.touched || AC.get('cclientPassword')?.dirty) {
        let verifyPassword = AC.get('cclientPassword')?.value;

        if(password != verifyPassword) {
            AC.get('cclientPassword')?.setErrors( {MatchPassword: true} )
        } else {
            return ;
        }
    }
  }
  patternValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return null;
    }
    const regex = new RegExp('^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,}$');
    const valid = regex.test(control.value);
    return valid ? null : { invalidPassword: true };

  };
  }
}
