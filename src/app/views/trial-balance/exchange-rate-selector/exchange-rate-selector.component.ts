/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { DateString, EventInfo, Identifiable } from '@app/core';

import { ExchangeRate } from '@app/models';

import { ArrayLibrary, sendEvent } from '@app/shared/utils';

export enum ExchangeRateSelectorEventType {
  SEARCH_EXCHANGE_RATES_CLICKED = 'ExchangeRateSelectorComponent.Event.SearchExchangeRatesClicked',
}


@Component({
  selector: 'emp-fa-exchange-rate-selector',
  templateUrl: './exchange-rate-selector.component.html',
})
export class ExchangeRateSelectorComponent implements OnChanges {

  @Input() exchangeRatesList: ExchangeRate[] = [];

  @Input() exchangeRateDate: DateString = '';

  @Input() exchangeRateTypeUID = '';

  @Input() valuateToCurrrencyUID = '';

  @Input() consolidateBalancesToTargetCurrency = false;

  @Input() showConsolidateBalancesToTargetCurrency = true;

  @Output() exchangeRateDateChange = new EventEmitter<DateString>();

  @Output() exchangeRateTypeUIDChange = new EventEmitter<string>();

  @Output() valuateToCurrrencyUIDChange = new EventEmitter<string>();

  @Output() consolidateBalancesToTargetCurrencyChange = new EventEmitter<boolean>();

  @Output() exchangeRateSelectorEvent = new EventEmitter<EventInfo>();

  exchangeRateTypeList: Identifiable[] = [];

  toCurrencyList: Identifiable[] = [];

  isLoading = false;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.exchangeRatesList) {
      this.setExchangeRateTypeList();
      this.setToCurrencyList();
      this.isLoading = false;
    }
  }


  get exchangeRateTypePlaceholder(): string{
    if (!this.exchangeRateDate) {
      return 'Seleccione la fecha';
    }

    return 'Seleccionar';
  }


  emitExchangeRateDate(value) {
    this.exchangeRateDate = value;
    this.exchangeRateDateChange.emit(this.exchangeRateDate);

    this.searchExchangeRatesList();
  }


  emitExchangeRateTypeUID() {
    this.exchangeRateTypeUIDChange.emit(this.exchangeRateTypeUID);
  }


  emitValuateToCurrrencyUID() {
    this.valuateToCurrrencyUIDChange.emit(this.valuateToCurrrencyUID);
  }


  emitConsolidateBalancesToTargetCurrency() {
    this.consolidateBalancesToTargetCurrencyChange.emit(this.consolidateBalancesToTargetCurrency);
  }


  searchExchangeRatesList() {
    this.clearFieldExchangeRateType();
    this.clearFieldToCurrency();

    if (!this.exchangeRateDate) {
      return;
    }

    this.isLoading = true;

    sendEvent(this.exchangeRateSelectorEvent, ExchangeRateSelectorEventType.SEARCH_EXCHANGE_RATES_CLICKED,
      this.exchangeRateDate);
  }


  onExchangeRateTypeChange() {
    this.setToCurrencyList();
    this.clearFieldToCurrency();
  }


  onExchangeRateTypeClear() {
    this.toCurrencyList = [];
    this.valuateToCurrrencyUID = '';
    this.emitValuateToCurrrencyUID();
  }


  private setExchangeRateTypeList() {
    this.exchangeRateTypeList = [];
    this.exchangeRatesList.forEach(item => {
      this.exchangeRateTypeList =
        [...ArrayLibrary.insertIfNotExist(this.exchangeRateTypeList, item.exchangeRateType, 'uid')];
    });
  }


  private setToCurrencyList() {
    this.toCurrencyList = [];
    this.exchangeRatesList
      .filter(x => x.exchangeRateType.uid === this.exchangeRateTypeUID)
      .forEach(item => {
        this.toCurrencyList =
          [...ArrayLibrary.insertIfNotExist(this.toCurrencyList, item.toCurrency, 'uid')];
      });
  }


  private clearFieldExchangeRateType() {
    this.exchangeRateTypeUID = '';
    this.emitExchangeRateTypeUID();
  }


  private clearFieldToCurrency() {
    this.valuateToCurrrencyUID = '';
    this.emitValuateToCurrrencyUID();
  }

}
