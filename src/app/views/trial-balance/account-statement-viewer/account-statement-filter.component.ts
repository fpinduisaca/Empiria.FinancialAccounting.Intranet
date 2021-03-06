/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { EventInfo } from '@app/core';

import { AccountStatementCommand, BalanceCommand, BalanceEntry, BalanceTypes, TrialBalanceCommand,
         TrialBalanceEntry, TrialBalanceTypes } from '@app/models';

import { sendEvent } from '@app/shared/utils';

export enum AccountStatementFilterEventType {
  BUILD_ACCOUNT_STATEMENT_CLICKED = 'AccountStatementFilterComponent.Event.BuildAccountStatementClicked',
}

@Component({
  selector: 'emp-fa-account-statement-filter',
  templateUrl: './account-statement-filter.component.html',
})
export class AccountStatementFilterComponent implements OnChanges {

  @Input() entry: BalanceEntry | TrialBalanceEntry;

  @Input() command: BalanceCommand | TrialBalanceCommand;

  @Output() accountStatementFilterEvent = new EventEmitter<EventInfo>();

  formData = {
    initialPeriod: {fromDate: null, toDate: null},
    finalPeriod: {fromDate: null, toDate: null},
  };

  initialPeriodFixedDate = null;

  finalPeriodFixedDate = null;


  ngOnChanges() {
    this.setInitialPeriodData(this.command);
    this.setFinalPeriodData(this.command as TrialBalanceCommand);
  }


  get trialBalanceType(): BalanceTypes | TrialBalanceTypes {
    return this.command.trialBalanceType;
  }


  get periodsRequired(): boolean {
    return [TrialBalanceTypes.BalanzaValorizadaComparativa]
      .includes(this.trialBalanceType as TrialBalanceTypes);
  }


  onBuildAccountStatementClicked() {
    const payload = { accountStatementCommand: this.buildAccountStatementCommand() };

    sendEvent(this.accountStatementFilterEvent,
      AccountStatementFilterEventType.BUILD_ACCOUNT_STATEMENT_CLICKED, payload);
  }


  private setInitialPeriodData(command: BalanceCommand | TrialBalanceCommand) {
    this.formData.initialPeriod.fromDate = this.command.initialPeriod?.fromDate;
    this.formData.initialPeriod.toDate = this.command.initialPeriod?.toDate;

    this.initialPeriodFixedDate = command.initialPeriod.toDate;
  }


  private setFinalPeriodData(command: TrialBalanceCommand) {
    this.formData.finalPeriod.fromDate = command.finalPeriod?.fromDate ?? null;
    this.formData.finalPeriod.toDate = command.finalPeriod?.toDate ?? null;

    this.finalPeriodFixedDate = command.finalPeriod?.toDate ?? null;
  }


  private buildAccountStatementCommand(): AccountStatementCommand {
    const formData = this.getFormData();

    const command = Object.assign({}, this.command, formData);

    const data: AccountStatementCommand = Object.assign({}, { command, entry: this.entry });

    return data;
  }


  private getFormData() {
    if (this.periodsRequired) {
      return {
        initialPeriod: this.getInitialPeriod(this.command),
        finalPeriod: this.getFinalPeriod(this.command as TrialBalanceCommand),
      };
    } else {
      return { initialPeriod: this.getInitialPeriod(this.command) };
    }
  }


  private getInitialPeriod(command: BalanceCommand | TrialBalanceCommand) {
    return Object.assign({}, command.initialPeriod, this.formData.initialPeriod);
  }


  private getFinalPeriod(command: TrialBalanceCommand) {
    return Object.assign({}, command.finalPeriod, this.formData.finalPeriod);
  }

}
