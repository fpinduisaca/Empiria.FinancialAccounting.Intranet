/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';

import { Assertion } from '@app/core';

import { BalancesDataService } from '@app/data-services';

import { EmptyTrialBalance, getEmptyTrialBalanceCommand, getTrialBalanceTypeNameFromUid, DataTable,
         TrialBalanceCommand } from '@app/models';

import { DataTableEventType } from '@app/views/reports-controls/data-table/data-table.component';

import {
  ExportReportModalEventType
} from '@app/views/reports-controls/export-report-modal/export-report-modal.component';

import { TrialBalanceFilterEventType } from '../trial-balance-filter/trial-balance-filter.component';


@Component({
  selector: 'emp-fa-trial-balance',
  templateUrl: './trial-balance.component.html',
})
export class TrialBalanceComponent {

  balanceTypeName = '';

  cardHint = 'Selecciona los filtros';

  isLoading = false;

  submitted = false;

  trialBalance: DataTable = EmptyTrialBalance;

  trialBalanceCommand: TrialBalanceCommand = getEmptyTrialBalanceCommand();

  displayExportModal = false;

  excelFileUrl = '';

  showFilters = false;

  constructor(private balancesDataService: BalancesDataService) { }


  onTrialBalanceFilterEvent(event) {
    if (this.submitted) {
      return;
    }

    switch (event.type as TrialBalanceFilterEventType) {

      case TrialBalanceFilterEventType.BUILD_TRIAL_BALANCE_CLICKED:
        Assertion.assertValue(event.payload.trialBalanceCommand, 'event.payload.trialBalanceCommand');

        this.trialBalanceCommand = event.payload.trialBalanceCommand as TrialBalanceCommand;

        this.setTrialBalanceData(EmptyTrialBalance);

        this.getTrialBalance(this.trialBalanceCommand);

        return;

      case TrialBalanceFilterEventType.CLEAR_TRIAL_BALANCE_CLICKED:
        Assertion.assertValue(event.payload.trialBalanceCommand, 'event.payload.trialBalanceCommand');

        this.trialBalanceCommand = event.payload.trialBalanceCommand as TrialBalanceCommand;

        this.setTrialBalanceData(EmptyTrialBalance);

        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  onTrialBalanceTableEvent(event) {
    switch (event.type as DataTableEventType) {

      case DataTableEventType.COUNT_ITEMS_DISPLAYED:
        Assertion.assertValue(event.payload, 'event.payload');
        setTimeout(() => this.setText(event.payload));
        return;

      case DataTableEventType.EXPORT_BALANCE:
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

      case ExportReportModalEventType.EXPORT_EXCEL_CLICKED:
        if (this.submitted || !this.trialBalanceCommand.accountsChartUID ) {
          return;
        }

        this.exportTrialBalanceToExcel();
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  private getTrialBalance(trialBalanceCommand: TrialBalanceCommand) {
    this.setSubmitted(true);

    this.balancesDataService.getTrialBalance(trialBalanceCommand)
      .toPromise()
      .then(x => {
        this.setTrialBalanceData(x);
        this.showFilters = false;
      })
      .finally(() => this.setSubmitted(false));
  }


  private exportTrialBalanceToExcel() {
    this.balancesDataService.exportTrialBalanceToExcel(this.trialBalanceCommand)
      .toPromise()
      .then(x => {
        this.excelFileUrl = x.url;
      });
  }


  private setTrialBalanceData(trialBalance: DataTable) {
    this.trialBalance = trialBalance;
    this.setText();
  }


  get isValidCommand() {
    return !!this.trialBalance.command['trialBalanceType'];
  }


  private setText(itemsDisplayed?: number) {

    if (!this.isValidCommand) {
      this.cardHint =  'Selecciona los filtros';
      return;
    }

    this.balanceTypeName = getTrialBalanceTypeNameFromUid(this.trialBalance.command['trialBalanceType']);

    this.cardHint = this.balanceTypeName;

    this.cardHint += itemsDisplayed >= 0 ?
      ` - ${itemsDisplayed} de ${this.trialBalance.entries.length} registros mostrados` :
      ` - ${this.trialBalance.entries.length} registros encontrados`;
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
