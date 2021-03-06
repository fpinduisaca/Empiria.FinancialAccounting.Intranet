/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { AccountingCalendarsDataService } from './accounting-calendars.data.service';
import { AccountsChartDataService } from './accounts-chart.data.service';
import { BalancesDataService } from './balances.data.service';
import { BalancesStoreDataService } from './balances-store.data.service';
import { ExchangeRatesDataService } from './exchange-rates.data.service';
import { ExternalProcessDataService } from './external-process.data.service';
import { FinancialReportsDataService } from './financial-reports.data.service';
import { ImportVouchersDataService } from './import-vouchers.data.service';
import { OperationalReportsDataService } from './operational-reports.data.service';
import { RulesDataService } from './rules.data.service';
import { SubledgerDataService } from './subledgers.data.service';
import { TransactionSlipsDataService } from './transaction-slips.data.service';
import { VouchersDataService } from './vouchers.data.service';

import { FileDownloadService } from './file-services/file-download.service';
import { getSaver, SAVER } from './file-services/saver.provider';


@NgModule({

  providers: [
    AccountingCalendarsDataService,
    AccountsChartDataService,
    BalancesDataService,
    BalancesStoreDataService,
    ExchangeRatesDataService,
    ExternalProcessDataService,
    FileDownloadService,
    FinancialReportsDataService,
    ImportVouchersDataService,
    OperationalReportsDataService,
    RulesDataService,
    SubledgerDataService,
    TransactionSlipsDataService,
    VouchersDataService,

    { provide: SAVER, useFactory: getSaver }
  ]

})
export class DataServicesModule { }
