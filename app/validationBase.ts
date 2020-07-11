
import { FormGroup, AbstractControl, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidationBase {
    private validations: { [x: string]: string; };

    private repalceKeys: { [x: string]: { split: (arg0: string) => string[]; }; };

    constructor() {
    }

    public getErrorMessage(field: AbstractControl) {
        return this.hasErrors(field) ? this.getValues(this.getTranslation(Object.keys(field.errors)[0]),
            field, Object.keys(field.errors)[0]) : '';
    }

    public getMessage(error: string) {
        return this.getTranslation(error);
    }

    public hasErrors(field: AbstractControl) {
        return (field.touched && field.dirty) && field.invalid;
    }

    public markFormTouched(formGroup: FormGroup | NgForm) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            control.markAsDirty();
            if (control.controls) {
                control.controls.forEach(c => {
                    this.markFormTouched(c);
                });
            }
        });
    }

    public patchForm(form: FormGroup, data: any, useMoment: boolean = true): FormGroup {
        const keys = Object.keys(form.value);
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            let value = data[key];

            if (useMoment) {
                if (typeof value === 'string' && value.length > 9 && moment(value).isValid()) {
                    value = moment(value).toDate();
                }
            }

            if (typeof value === 'string' && (value.length === 16 || value.length === 8) && value[2] === ':' && value[5] === ':') {
                value = value.substr(0, 5);
            }

            if (key != null && value != null) {
                form.get(key).setValue(value);
            }
        }
        return form;
    }

    private getValues(message: string, field: AbstractControl, key: string): string {
        if (this.repalceKeys[key]) {
            const replaceKey: string[] = this.repalceKeys[key].split('.');
            let err = field.errors;
            for (const rKey of replaceKey) {
                err = err[rKey];
            }
            return message.replace(`:${key}`, `${err}`);
        } else {
            return message;
        }
    }

    private getTranslation(key: string): string {
        return this.validations && this.validations[key] ? this.validations[key] : key;
    }
}
