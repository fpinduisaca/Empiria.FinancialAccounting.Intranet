/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { DateString, DateStringLibrary, EventInfo, Identifiable } from '@app/core';

import { PresentationLayer, SubscriptionHelper } from '@app/core/presentation';

import { AccountsChartMasterData, BalanceCommand, BalanceTypes, BalanceTypeList,
         getEmptyBalanceCommand } from '@app/models';

import { AccountChartStateSelector } from '@app/presentation/exported.presentation.types';

import { sendEvent } from '@app/shared/utils';

export enum BalanceQuickFilterEventType {
  BUILD_BALANCE_CLICKED = 'BalanceQuickFilterComponent.Event.BuildBalanceClicked',
}

@Component({
  selector: 'emp-fa-balance-quick-filter',
  templateUrl: './balance-quick-filter.component.html',
})
export class BalanceQuickFilterComponent implements OnInit, OnDestroy {

  @Output() balanceQuickFilterEvent = new EventEmitter<EventInfo>();

  balanceCommand: BalanceCommand = getEmptyBalanceCommand();

  accountsChartMasterDataList: AccountsChartMasterData[] = [];

  balanceTypeList: Identifiable[] = BalanceTypeList;

  isLoading = false;

  helper: SubscriptionHelper;

  constructor(private uiLayer: PresentationLayer) {
    this.helper = uiLayer.createSubscriptionHelper();
  }


  ngOnInit() {
    this.setInitialPeriodDefault();
    this.loadAccountsCharts();
  }


  ngOnDestroy() {
    this.helper.destroy();
  }


  get trialBalanceTypeSelected(): Identifiable {
    return !this.balanceCommand.trialBalanceType ? null :
      this.balanceTypeList.find(x => x.uid === this.balanceCommand.trialBalanceType);
  }


  get displayFromAccount(): boolean {
    return this.balanceCommand.trialBalanceType === BalanceTypes.SaldosPorCuentaConsultaRapida;
  }


  get displaySubledgerAccount(): boolean {
    return this.balanceCommand.trialBalanceType === BalanceTypes.SaldosPorAuxiliarConsultaRapida;
  }


  get displayWithSubledgerAccount(): boolean {
    return this.balanceCommand.trialBalanceType === BalanceTypes.SaldosPorCuentaConsultaRapida;
  }


  onBalanceTypeChange() {
    this.balanceCommand.fromAccount = '';
    this.balanceCommand.subledgerAccount = '';
    this.balanceCommand.withSubledgerAccount = this.displaySubledgerAccount;
    this.balanceCommand.withAllAccounts = false;
  }


  onDatepickerInitialPeriodToDateChange(toDate: DateString) {
    this.validateValueOfInitPeriodFromDate(toDate);
  }


  onBuildBalanceClicked() {
    const payload = {
      trialBalanceType: this.trialBalanceTypeSelected,
      balanceCommand: this.getBalanceCommandData(),
    };

    sendEvent(this.balanceQuickFilterEvent, BalanceQuickFilterEventType.BUILD_BALANCE_CLICKED, payload);
  }


  private setInitialPeriodDefault() {
    this.balanceCommand.initialPeriod.toDate = DateStringLibrary.today();
    this.validateValueOfInitPeriodFromDate(this.balanceCommand.initialPeriod.toDate);
  }


  private loadAccountsCharts() {
    this.isLoading = true;

    this.helper.select<AccountsChartMasterData[]>(AccountChartStateSelector.ACCOUNTS_CHARTS_MASTER_DATA_LIST)
      .subscribe(x => {
        this.accountsChartMasterDataList = x;
        this.isLoading = false;
      });
  }


  private validateValueOfInitPeriodFromDate(toDate: DateString) {
    this.balanceCommand.initialPeriod.fromDate = DateStringLibrary.getFirstDayOfMonthFromDateString(toDate);
  }


  private getBalanceCommandData(): BalanceCommand {
    const data: BalanceCommand = {
      accountsChartUID: this.balanceCommand.accountsChartUID,
      trialBalanceType: this.balanceCommand.trialBalanceType,
      fromAccount: this.balanceCommand.fromAccount,
      subledgerAccount: this.balanceCommand.subledgerAccount,
      initialPeriod: {
        fromDate: this.balanceCommand.initialPeriod.fromDate,
        toDate: this.balanceCommand.initialPeriod.toDate,
      },
      withSubledgerAccount: this.balanceCommand.withSubledgerAccount,
      withAllAccounts: this.balanceCommand.withAllAccounts,
    };

    return data;
  }

}
