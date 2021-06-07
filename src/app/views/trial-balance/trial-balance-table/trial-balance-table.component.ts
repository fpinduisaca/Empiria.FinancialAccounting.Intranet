/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';

import { EventInfo } from '@app/core';

import { EmptyTrialBalance, DataTableColumn, TrialBalance, TrialBalanceEntry } from '@app/models';

import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

import { TrialBalanceControlsEventType } from './trial-balance-controls.component';

@Component({
  selector: 'emp-fa-trial-balance-table',
  templateUrl: './trial-balance-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrialBalanceTableComponent implements OnChanges {

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  @Input() trialBalance: TrialBalance = EmptyTrialBalance;

  @Output() itemsDisplayed = new EventEmitter<number>();

  columns: DataTableColumn[] = [];

  displayedColumns: string[] = [];

  dataSource: TableVirtualScrollDataSource<TrialBalanceEntry>;

  filter = '';

  indexSelected = '';

  ngOnChanges(): void {
    this.filter = '';
    this.indexSelected = '';

    this.initDataSource();

    this.scrollToTop();
    this.emitItemsDisplayed();
  }


  get displayTrialBalanceTable() {
    return !!this.trialBalance.command.trialBalanceType;
  }


  initDataSource() {
    this.columns = this.trialBalance.columns;
    this.displayedColumns = this.columns.map(column => column.field);

    this.dataSource = new TableVirtualScrollDataSource(this.trialBalance.entries);
    this.dataSource.filterPredicate = this.getFilterPredicate();
    // TODO: set titles of columns
  }


  onTrialBalanceControlsEvent(event: EventInfo) {
   switch (event.type as TrialBalanceControlsEventType) {

      case TrialBalanceControlsEventType.FILTER_CHANGED:

        this.filter = event.payload.filter as string;

        this.applyFilter(this.filter);

        return;

      case TrialBalanceControlsEventType.EXPORT_BUTTON_CLICKED:

        console.log('EXPORT_BUTTON_CLICKED');

        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  private getFilterPredicate() {
    return (row: TrialBalanceEntry, filters: string) => (
      this.columns.filter(x => x.type !== 'decimal' &&
                               row[x.field].toLowerCase().includes(filters)).length > 0
    );
  }


  private applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
    this.scrollToTop();
    this.emitItemsDisplayed();
  }


  private scrollToTop() {
    if (this.virtualScroll) {
      this.virtualScroll.scrollToIndex(-1);
    }
  }


  private emitItemsDisplayed() {
    this.itemsDisplayed.emit(this.dataSource.filteredData.length);
  }

}