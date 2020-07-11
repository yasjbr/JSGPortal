import { Component, OnInit, Input, ViewEncapsulation  } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';


@Component({
  selector: 'mat-select-check-all',
  templateUrl: './mat-select-check-all.component.html',
  styleUrls: ['./mat-select-check-all.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MatSelectCheckAllComponent {

  @Input() model: FormControl;
  @Input() values = [];
  @Input() text = 'Select All';

  isChecked(): boolean {
    return this.model.value && this.values.length
      && this.model.value.length === this.values.length;
  }

  isIndeterminate(): boolean {
    return this.model.value && this.values.length && this.model.value.length
      && this.model.value.length < this.values.length;
  }

  toggleSelection(change: MatCheckboxChange): void {
    if (change.checked) {
      this.model.setValue(this.values);
    } else {
      this.model.setValue([]);
    }
  }
}
