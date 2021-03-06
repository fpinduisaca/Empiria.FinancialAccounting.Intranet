/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


/* Actions */

export type FAActions = '';


/* Commands */

export type FACommands = '';


/* Effects */

export type FAEffects = '';


/* Selectors */

import { SelectorType as AccountChartStateSelector } from './account-chart.presentation.handler';
export { SelectorType as AccountChartStateSelector } from './account-chart.presentation.handler';

import { SelectorType as ReportingStateSelector } from './reporting.presentation.handler';
export { SelectorType as ReportingStateSelector } from './reporting.presentation.handler';

import { SelectorType as VoucherStateSelector } from './voucher.presentation.handler';
export { SelectorType as VoucherStateSelector } from './voucher.presentation.handler';

export type FASelectors = AccountChartStateSelector | ReportingStateSelector | VoucherStateSelector;
