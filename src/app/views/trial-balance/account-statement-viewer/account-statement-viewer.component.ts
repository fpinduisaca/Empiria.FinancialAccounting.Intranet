/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { Assertion } from '@app/core';

import { BalancesDataService, VouchersDataService } from '@app/data-services';

import { AccountStatement, AccountStatementCommand, AccountStatementEntry, BalanceCommand, BalanceEntry,
         EmptyAccountStatement, EntryItemTypeList, FileReport, TrialBalanceCommand,
         TrialBalanceEntry } from '@app/models';

import { MessageBoxService } from '@app/shared/containers/message-box';

import { DataTableEventType } from '@app/views/reports-controls/data-table/data-table.component';

import {
  ExportReportModalEventType
} from '@app/views/reports-controls/export-report-modal/export-report-modal.component';

import { AccountStatementFilterEventType } from './account-statement-filter.component';


@Component({
  selector: 'emp-fa-account-statement-viewer',
  templateUrl: './account-statement-viewer.component.html',
})
export class AccountStatementViewerComponent implements OnChanges {

  @Input() entry: BalanceEntry | TrialBalanceEntry;

  @Input() command: BalanceCommand | TrialBalanceCommand;

  @Output() closeEvent = new EventEmitter<void>();

  cardHint = 'Cargando...';

  isLoading = false;
  submitted = false;
  commandExecuted = false;

  accountStatementCommand: AccountStatementCommand = null;
  accountStatement: AccountStatement = EmptyAccountStatement;

  displayExportModal = false;
  excelFileUrl = '';

  displayVoucherModal = false;
  voucherFile: FileReport;

  constructor(private balancesDataService: BalancesDataService,
              private vouchersData: VouchersDataService,
              private messageBox: MessageBoxService) {

  }


  ngOnChanges() {
    if (!!this.command && !!this.entry) {
      this.buildAccountStatementCommand();
      this.resetAccountStatementData();
      this.getAccountStatement();
    }
  }


  get entriesTotal(): number {
    return this.accountStatement?.entries?.filter(x => EntryItemTypeList.includes(x.itemType)).length;
  }


  get isValidCommand() {
    return false;
  }


  onCloseButtonClicked() {
    this.closeEvent.emit();
  }


  onFilterEvent(event) {
    if (this.submitted) {
      return;
    }

    switch (event.type as AccountStatementFilterEventType) {

      case AccountStatementFilterEventType.BUILD_ACCOUNT_STATEMENT_CLICKED:
        Assertion.assertValue(event.payload.accountStatementCommand, 'event.payload.accountStatementCommand');
        this.accountStatementCommand = Object.assign({}, event.payload.accountStatementCommand);
        this.getAccountStatement();
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  onDataTableEvent(event) {
    switch (event.type as DataTableEventType) {

      case DataTableEventType.COUNT_FILTERED_ENTRIES:
        Assertion.assertValue(event.payload.displayedEntriesMessage, 'event.payload.displayedEntriesMessage');
        this.setText(event.payload.displayedEntriesMessage as string);
        return;

      case DataTableEventType.ENTRY_CLICKED:
        Assertion.assertValue(event.payload.entry, 'event.payload.entry');
        Assertion.assertValue(event.payload.entry.voucherId, 'event.payload.entry.voucherId');
        this.getVoucherForPrint(event.payload.entry as AccountStatementEntry);
        return;

      case DataTableEventType.EXPORT_DATA:
        this.setDisplayExportModal(true);
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  onExportReportModalEvent(event) {
    switch (event.type as ExportReportModalEventType) {

      case ExportReportModalEventType.CLOSE_MODAL_CLICKED:
        this.setDisplayExportModal(false);
        return;

      case ExportReportModalEventType.EXPORT_BUTTON_CLICKED:
        if (this.submitted) {
          return;
        }

        this.exportAccountStatementToExcel();
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  private getAccountStatement() {
    this.setSubmitted(true);

    this.balancesDataService.getAccountStatement(this.accountStatementCommand)
      .toPromise()
      .then(x => {
        this.commandExecuted = true;
        this.setAccountStatementData(x);
      })
      .catch(e => this.onCloseButtonClicked())
      .finally(() => this.setSubmitted(false));
  }


  private exportAccountStatementToExcel() {
    this.balancesDataService.exportAccountStatementToExcel(this.accountStatementCommand)
      .toPromise()
      .then(x => this.excelFileUrl = x.url);
  }


  private getVoucherForPrint(accountStatementEntry: AccountStatementEntry) {
    if (!accountStatementEntry) {
      return;
    }

    this.isLoading = true;

    this.vouchersData.getVoucherForPrint(accountStatementEntry.voucherId)
      .toPromise()
      .then(x => this.voucherFile = x)
      .finally(() => this.isLoading = false);
  }


  private buildAccountStatementCommand() {
    this.accountStatementCommand = {
      command: this.command,
      entry: this.entry,
    };
  }


  private resetAccountStatementData() {
    this.commandExecuted = false;
    this.setAccountStatementData(EmptyAccountStatement);
  }


  private setAccountStatementData(accountStatement: AccountStatement) {
    this.accountStatement = accountStatement;
    this.setText();
  }


  private setText(displayedEntriesMessage?: string) {
    if (!this.commandExecuted) {
      this.cardHint = 'Cargando...';
      return;
    }

    if (displayedEntriesMessage) {
      this.cardHint = `${this.accountStatement.title} - ${displayedEntriesMessage}`;
      return;
    }

    this.cardHint = `${this.accountStatement.title} - ${this.entriesTotal} registros encontrados`;
  }


  private setSubmitted(submitted: boolean) {
    this.isLoading = submitted;
    this.submitted = submitted;
  }


  private setDisplayExportModal(display) {
    this.displayExportModal = display;
    this.excelFileUrl = '';
  }

}
