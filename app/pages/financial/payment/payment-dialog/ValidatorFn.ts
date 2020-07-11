import { AbstractControl, ValidationErrors, FormGroup } from "@angular/forms";

interface ValidatorFn {
    (control: AbstractControl): ValidationErrors | null
  }

