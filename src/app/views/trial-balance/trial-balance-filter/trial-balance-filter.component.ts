/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Assertion, EventInfo, Identifiable } from '@app/core';

import { PresentationLayer, SubscriptionHelper } from '@app/core/presentation';

import { ExchangeRatesDataService } from '@app/data-services';

import { AccountsChartMasterData, BalancesType, EmptyTrialBalanceCommand, ExchangeRate,
         getLevelsListFromPattern, TrialBalanceCommand, TrialBalanceTypeList} from '@app/models';

import { AccountChartStateSelector } from '@app/presentation/exported.presentation.types';

import { expandCollapse } from '@app/shared/animations/animations';

import { ExchangeRateSelectorEventType } from '../exchange-rate-selector/exchange-rate-selector.component';

export enum TrialBalanceFilterEventType {
  BUILD_TRIAL_BALANCE_CLICKED = 'TrialBalanceFilterComponent.Event.BuildTrialBalanceClicked',
  CLEAR_TRIAL_BALANCE_CLICKED = 'TrialBalanceFilterComponent.Event.ClearTrialBalanceClicked',
}


@Component({
  selector: 'emp-fa-trial-balance-filter',
  templateUrl: './trial-balance-filter.component.html',
  animations: [expandCollapse],
})
export class TrialBalanceFilterComponent implements OnInit, OnDestroy {

  @Input() showFilters = false;

  @Output() showFiltersChange = new EventEmitter<boolean>();

  @Output() trialBalanceFilterEvent = new EventEmitter<EventInfo>();

  accountChartSelected: AccountsChartMasterData = null;

  accountsChartMasterDataList: AccountsChartMasterData[] = [];

  trialBalanceCommand: TrialBalanceCommand = Object.assign({}, EmptyTrialBalanceCommand);

  trialBalanceTypeList: Identifiable[] = TrialBalanceTypeList;

  levelsList: Identifiable[] = [];

  balancesTypeList: Identifiable[] = BalancesType;

  isLoading = false;

  helper: SubscriptionHelper;

  displayExchangeRates = false;

  exchangeRatesList: ExchangeRate[] = [];

  constructor(private uiLayer: PresentationLayer,
              private exchangeRatesData: ExchangeRatesDataService) {
    this.helper = uiLayer.createSubscriptionHelper();
  }


  ngOnInit(): void {
    this.loadAccountsCharts();
    this.trialBalanceCommand.balancesType = this.balancesTypeList[0].uid;
  }


  ngOnDestroy() {
    this.helper.destroy();
  }

  get trialBalanceFormFieldsValid(): boolean {
    return !!this.trialBalanceCommand.trialBalanceType &&
           !!this.trialBalanceCommand.accountsChartUID &&
           !!this.trialBalanceCommand.fromDate &&
           !!this.trialBalanceCommand.toDate &&
           !!this.trialBalanceCommand.balancesType;
  }


  get exchangeRateFormFieldsValid(): boolean {
    if (!this.displayExchangeRates) {
      return true;
    }

    return !!this.trialBalanceCommand.exchangeRateDate &&
           !!this.trialBalanceCommand.exchangeRateTypeUID &&
           !!this.trialBalanceCommand.valuateToCurrrencyUID;
  }


  get isTrialBalance(): boolean {
    return ['Balanza', 'BalanzaConAuxiliares'].includes(this.trialBalanceCommand.trialBalanceType);
  }


  get isBalancesByAccount(): boolean {
    return ['SaldosPorCuenta'].includes(this.trialBalanceCommand.trialBalanceType);
  }


  get isBalancesBySubledgerAccount(): boolean {
    return['SaldosPorAuxiliar'].includes(this.trialBalanceCommand.trialBalanceType);
  }


  get isBalancesByAccountWithLedgers(): boolean {
    return['SaldosPorCuentaConDelegaciones'].includes(this.trialBalanceCommand.trialBalanceType);
  }


  get isAnalyticalAccounts(): boolean {
    return['AnaliticoDeCuentas'].includes(this.trialBalanceCommand.trialBalanceType);
  }


  onShowFiltersClicked(){
    this.showFilters = !this.showFilters;
    this.showFiltersChange.emit(this.showFilters);
  }


  onAccountChartChanges(accountChart: AccountsChartMasterData) {
    this.accountChartSelected = accountChart;
    this.setLevelsList();
    this.validateFieldToClear();
  }


  onExchangeRateDateChanged(value) {
    this.trialBalanceCommand.exchangeRateDate = value;
    this.exchangeRatesList = [];
  }


  onExchangeRateSelectorEvent(event) {
    if (ExchangeRateSelectorEventType.SEARCH_EXCHANGE_RATES_CLICKED === event.type) {
      this.getExchangeRatesForDate();
    }
  }


  onClearFilters() {
    this.displayExchangeRates = false;
    this.exchangeRatesList = [];

    this.trialBalanceCommand = Object.assign({}, EmptyTrialBalanceCommand, {
        trialBalanceType: this.trialBalanceCommand.trialBalanceType,
        accountsChartUID: this.trialBalanceCommand.accountsChartUID,
        ledgers: this.trialBalanceCommand.ledgers,
        fromDate: this.trialBalanceCommand.fromDate,
        toDate: this.trialBalanceCommand.toDate,
        balancesType: this.balancesTypeList[0].uid,
      });

    this.sendEvent(TrialBalanceFilterEventType.CLEAR_TRIAL_BALANCE_CLICKED,
                   {trialBalanceCommand: this.getTrialBalanceCommandValidData()});
  }


  onBuildTrialBalanceClicked() {
    this.sendEvent(TrialBalanceFilterEventType.BUILD_TRIAL_BALANCE_CLICKED,
                   {trialBalanceCommand: this.getTrialBalanceCommandValidData()});
  }


  private getTrialBalanceCommandValidData(): TrialBalanceCommand {
    Assertion.assert(this.trialBalanceFormFieldsValid,
      'Programming error: form must be validated before command execution.');

    const data: TrialBalanceCommand = {
      trialBalanceType: this.trialBalanceCommand.trialBalanceType,
      accountsChartUID: this.trialBalanceCommand.accountsChartUID,
      ledgers: this.trialBalanceCommand.ledgers,
      fromDate: this.trialBalanceCommand.fromDate,
      toDate: this.trialBalanceCommand.toDate,
      showCascadeBalances: this.trialBalanceCommand.showCascadeBalances,
      balancesType: this.trialBalanceCommand.balancesType,
      level: this.trialBalanceCommand.level,
    };

    this.validateCommandFieldsByBalanceType(data);

    return data;
  }


  validateCommandFieldsByBalanceType(data: TrialBalanceCommand) {
    if (this.isTrialBalance) {
      data.fromAccount = this.trialBalanceCommand.fromAccount;
      data.toAccount = this.trialBalanceCommand.toAccount;
    }

    if (this.isBalancesByAccount || this.isBalancesBySubledgerAccount) {
      data.fromAccount = this.trialBalanceCommand.fromAccount;
      data.subledgerAccount = this.trialBalanceCommand.subledgerAccount;
    }

    if (this.displayExchangeRates) {
      Assertion.assert(this.exchangeRateFormFieldsValid,
        'Programming error: form must be validated before command execution.');

      data.exchangeRateDate = this.trialBalanceCommand.exchangeRateDate;
      data.exchangeRateTypeUID = this.trialBalanceCommand.exchangeRateTypeUID;
      data.valuateToCurrrencyUID = this.trialBalanceCommand.valuateToCurrrencyUID;
      data.consolidateBalancesToTargetCurrency = this.trialBalanceCommand.consolidateBalancesToTargetCurrency;
    }
  }


  private loadAccountsCharts() {
    this.isLoading = true;

    this.helper.select<AccountsChartMasterData[]>(AccountChartStateSelector.ACCOUNTS_CHARTS_MASTER_DATA_LIST)
      .subscribe(x => {
        this.accountsChartMasterDataList = x;
        this.setLevelsList();
        this.isLoading = false;
      });
  }


  private getExchangeRatesForDate() {
    if (!this.trialBalanceCommand.exchangeRateDate) {
      return;
    }

    this.exchangeRatesData.getExchangeRatesForDate(this.trialBalanceCommand.exchangeRateDate)
      .subscribe(x => this.exchangeRatesList = x ?? []);
  }


  private setLevelsList(){
    if (!this.accountChartSelected) {
      this.levelsList =  [];
      return;
    }

    this.levelsList = getLevelsListFromPattern(this.accountChartSelected.accountsPattern,
                                               this.accountChartSelected.accountNumberSeparator,
                                               this.accountChartSelected.maxAccountLevel);
  }


  private validateFieldToClear() {
    this.trialBalanceCommand.ledgers = this.accountChartSelected.ledgers
      .filter(x => this.trialBalanceCommand.ledgers.includes(x.uid))
      .map(x => x.uid);

    this.trialBalanceCommand.level =
      this.levelsList.filter(x => this.trialBalanceCommand.level + '' === x.uid).length > 0 ?
      this.trialBalanceCommand.level : null;
  }


  private sendEvent(eventType: TrialBalanceFilterEventType, payload?: any) {
    const event: EventInfo = {
      type: eventType,
      payload
    };

    this.trialBalanceFilterEvent.emit(event);
  }

}
