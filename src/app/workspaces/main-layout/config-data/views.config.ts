/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { View } from '../common-models/common';


export const AccountingOperationViews: View[] = [
  {
    name: 'AccountingOperation.MyInbox',
    title: 'Mis pólizas pendientes',
    url: '/operacion-contable/mis-polizas-pendientes'
  },
  {
    name: 'AccountingOperation.ControlDesk',
    title: 'Mesa de control',
    menuTitle: 'Mesa de control',
    url: '/operacion-contable/mesa-de-control'
  },
  {
    name: 'AccountingOperation.Finished',
    title: 'Pólizas en libros',
    menuTitle: 'Pólizas en libros',
    url: '/operacion-contable/polizas-en-libros'
  },
  {
    name: 'AccountingOperation.All',
    title: 'Todas las pólizas',
    menuTitle: 'Todas las pólizas',
    url: '/operacion-contable/todas-las-polizas'
  }
];


export const AccountingDashboardsViews: View[] = [
  {
    name: 'AccountingDashboards.AccountsBalancesAndTrialBalances',
    title: 'Saldos y Balanzas',
    url: '/tableros/saldos-y-balanzas'
  },
  {
    name: 'AccountingDashboards.AccountGroupsBalances',
    title: 'Reportes regulatorios',
    url: '/tableros/reportes-regulatorios'
  },
  {
    name: 'AccountingDashboards.FinancialFacts',
    title: 'Indicadores financieros',
    url: '/tableros/indicadores-financieros'
  },
  {
    name: 'AccountingDashboards.Alerts',
    title: 'Alertas',
    url: '/tableros/alertas'
  }
];


export const AccountingReportsViews: View[] = [
  {
    name: 'AccountingReports.RegulatoryReports',
    title: 'Reportes regulatorios',
    url: '/reportes/regulatorios'
  },
  {
    name: 'AccountingReports.OperationalReports',
    title: 'Operativos',
    url: '/reportes/operativos'
  },
  {
    name: 'AccountingReports.OperationalReports',
    title: 'Financieros',
    url: '/reportes/financieros'
  },
  {
    name: 'AccountingReports.OperationalReports',
    title: 'Todos los reportes',
    url: '/reportes/todos'
  }
];


export const AccountingCataloguesAndRulesViews: View[] = [
  {
    name: 'AccountingCataloguesAndRulesViews.AccountsChart',
    title: 'Catálogos de cuentas',
    url: '/reglas-y-catalogos/catalogos-de-cuentas'
  },
  {
    name: 'AccountingCataloguesAndRulesViews.AccountsGroups',
    title: 'Agrupaciones',
    url: '/reglas-y-catalogos/agrupaciones'
  },
  {
    name: 'AccountingCataloguesAndRulesViews.AccountingRules',
    title: 'Reglas contabilizadoras',
    url: '/reglas-y-catalogos/reglas-contabilizadoras'
  },
  {
    name: 'AccountingCataloguesAndRulesViews.AccountsGroups',
    title: 'Diseñador de reportes',
    url: '/reglas-y-catalogos/disenador-de-reportes'
  }
];


export const AccountingSystemManagementViews: View[] = [
  {
    name: 'AccountingSystemManagementViews.BalanceGeneration',
    title: 'Generación de saldos',
    url: '/administracion/generacion-de-saldos'
  }
];

export const UnauthorizedViews: View[] = [
  {
    name: 'Unauthorized',
    title: '',
    url: '/unauthorized'
  },
];
