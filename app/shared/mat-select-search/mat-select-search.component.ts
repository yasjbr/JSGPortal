import { Output } from '@angular/core';
/**
 * Copyright (c) 2018 Bithost GmbH All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, QueryList,
  ViewChild,
  ContentChild
} from '@angular/core';

import { MatOption, MatSelect } from '@angular/material';
import {
  A,
  Z,
  ZERO,
  NINE,
  SPACE,
} from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { delay, take, takeUntil } from 'rxjs/operators';
import { MatSelectSearchClearDirective } from './mat-select-search-clear.directive';

/* tslint:disable:member-ordering component-selector */
@Component({
  selector: 'app-mat-select-search',
  templateUrl: './mat-select-search.component.html',
  styleUrls: ['./mat-select-search.component.scss']
})
export class MatSelectSearchComponent implements OnInit, OnDestroy, AfterViewInit {

  /** Label of the search placeholder */
  @Input() placeholderLabel = 'Search';

  /** Label to be shown when no entries are found. Set to null if no message should be shown. */
  @Input() noEntriesFoundLabel = 'No data found';

  /**
    * Whether or not the search field should be cleared after the dropdown menu is closed.
    * Useful for server-side filtering. See [#3](https://github.com/bithost-gmbh/ngx-mat-select-search/issues/3)
    */
  @Input() clearSearchInput = true;

  /** Disables initial focusing of the input field */
  @Input() disableInitialFocus = false;

  @Input() list = [];
  filteredList = [];

  @Output() filterChanged = new EventEmitter();

  /** Reference to the search input field */
  @ViewChild('searchSelectInput', { read: ElementRef }) searchSelectInput: ElementRef;

  /** Reference to the search input field */
  @ViewChild('innerSelectSearch', { read: ElementRef }) innerSelectSearch: ElementRef;

  /** Reference to custom search input clear icon */
  @ContentChild(MatSelectSearchClearDirective) clearIcon: MatSelectSearchClearDirective;

  /** Reference to the MatSelect options */
  public _options: QueryList<MatOption>;

  /** Whether the backdrop class has been set */
  private overlayClassSet = false;

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(@Inject(MatSelect) public matSelect: MatSelect,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.filteredList = this.list;

    // set custom panel class
    const panelClass = 'mat-select-search-panel';
    if (this.matSelect.panelClass) {
      if (Array.isArray(this.matSelect.panelClass)) {
        this.matSelect.panelClass.push(panelClass);
      } else if (typeof this.matSelect.panelClass === 'string') {
        this.matSelect.panelClass = [this.matSelect.panelClass, panelClass];
      } else if (typeof this.matSelect.panelClass === 'object') {
        this.matSelect.panelClass[panelClass] = true;
      }
    } else {
      this.matSelect.panelClass = panelClass;
    }

    // when the select dropdown panel is opened or closed
    this.matSelect.openedChange
      .pipe(
        delay(1),
        takeUntil(this._onDestroy)
      )
      .subscribe((opened) => {
        if (opened) {
          // focus the search field when opening
          this.getWidth();
          if (!this.disableInitialFocus) {
            this._focus();
          }
        } else {
          // clear it when closing
          if (this.clearSearchInput) {
            this._reset();
          }
        }
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngAfterViewInit() {
    this.setOverlayClass();

    // update view when available options change
    this.matSelect.openedChange
      .pipe(
        take(1),
        takeUntil(this._onDestroy)
      ).subscribe(() => {
        this.matSelect.options.changes
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.changeDetectorRef.markForCheck();
          });
      });
  }

  /**
   * Handles the key down event with MatSelect.
   * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
   * @param event
   */
  _handleKeydown(event: KeyboardEvent) {
    // Prevent propagation for all alphanumeric characters in order to avoid selection issues
    if ((event.key && event.key.length === 1) ||
      (event.keyCode >= A && event.keyCode <= Z) ||
      (event.keyCode >= ZERO && event.keyCode <= NINE) ||
      (event.keyCode === SPACE)) {
      event.stopPropagation();
    }
  }


  onBlur(value: string) {
    this.filter(value);
  }

  public filter(value: string) {
    this.filteredList = this.list.filter(employee => {
      return this.objectHasValue(employee, value);
    });

    this.filterChanged.emit(this.filteredList);
  }

  private objectHasValue(object, value): boolean {
    let result = false;

    const keys = Object.keys(object);

    for (let i = 0; i < keys.length; i++) {
      const element = keys[i];

      const x = object[element];

      if (!x) {
        continue;
      }

      if (typeof x !== 'object') {
        if (x.toString().toLowerCase().includes(value.toLowerCase())) {
          result = true;
          break;
        } else {
          continue;
        }
      }

      if (this.objectHasValue(x, value)) {
        result = true;
        break;
      } else {
        continue;
      }
    }

    return result;
  }

  /**
   * Focuses the search input field
   */
  public _focus() {
    if (!this.searchSelectInput || !this.matSelect.panel) {
      return;
    }
    // save and restore scrollTop of panel, since it will be reset by focus()
    // note: this is hacky
    const panel = this.matSelect.panel.nativeElement;
    // const scrollTop = panel.scrollTop;

    // focus
    this.searchSelectInput.nativeElement.focus();

    // panel.scrollTop = scrollTop;
  }

  /**
   * Resets the current search value
   * @param focus whether to focus after resetting
   */
  public _reset(focus?: boolean) {
    if (!this.searchSelectInput) {
      return;
    }

    this.searchSelectInput.nativeElement.value = '';
    this.filter('');

    if (focus) {
      this._focus();
    }
  }

  /**
   * Sets the overlay class  to correct offsetY
   * so that the selected option is at the position of the select box when opening
   */
  private setOverlayClass() {
    if (this.overlayClassSet) {
      return;
    }
    const overlayClass = 'cdk-overlay-pane-select-search';

    this.matSelect.overlayDir.attach
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        // note: this is hacky, but currently there is no better way to do this
        let element: HTMLElement = this.searchSelectInput.nativeElement;
        let overlayElement: HTMLElement;
        while (element = element.parentElement) {
          if (element.classList.contains('cdk-overlay-pane')) {
            overlayElement = element;
            break;
          }
        }
        if (overlayElement) {
          overlayElement.classList.add(overlayClass);
        }
      });

    this.overlayClassSet = true;
  }


  /**
   *  Set the width of the innerSelectSearch to fit even custom scrollbars
   *  And support all Operation Systems
   */
  private getWidth() {
    if (!this.innerSelectSearch || !this.innerSelectSearch.nativeElement) {
      return;
    }
    let element: HTMLElement = this.innerSelectSearch.nativeElement;
    let panelElement: HTMLElement;
    while (element = element.parentElement) {
      if (element.classList.contains('mat-select-panel')) {
        panelElement = element;
        break;
      }
    }
    if (panelElement) {
      this.innerSelectSearch.nativeElement.style.width = panelElement.clientWidth + 'px';
    }
  }

}
