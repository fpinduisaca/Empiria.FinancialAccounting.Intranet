/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export enum PermissionsLibrary {
  ROUTE_OPERACION_CONTABLE = 'route-operacion-contable',
  ROUTE_TABLEROS = 'route-tableros',
  ROUTE_REPORTES = 'route-reportes',
  ROUTE_REGLAS_Y_CATALOGOS = 'route-reglas-y-catalogos',
  ROUTE_ADMINISTRACION = 'route-administracion',
  MENU_OPERACION_CONTABLE = 'menu-operacion-contable',
  MENU_TABLEROS = 'menu-tableros',
  MENU_REPORTES = 'menu-reportes',
  MENU_REGLAS_Y_CATALOGOS = 'menu-reglas-y-catalogos',
  MENU_ADMINISTRACION = 'menu-administracion',
  FEATURE_VOUCHERS_ADD = 'feature-vouchers-add',
}


export const ROUTES_LIBRARY = {

  // #region app-routing module

  operacion_contable: {
    permission: PermissionsLibrary.ROUTE_OPERACION_CONTABLE,
    parent: '',
    path: 'operacion-contable'
  },
  tableros: {
    permission: PermissionsLibrary.ROUTE_TABLEROS,
    parent: '',
    path: 'tableros',
  },
  reportes: {
    permission: PermissionsLibrary.ROUTE_REPORTES,
    parent: '',
    path: 'reportes',
  },
  reglas_y_catalogos: {
    permission: PermissionsLibrary.ROUTE_REGLAS_Y_CATALOGOS,
    parent: '',
    path: 'reglas-y-catalogos',
  },
  administracion: {
    permission: PermissionsLibrary.ROUTE_ADMINISTRACION,
    parent: '',
    path: 'administracion',
  },
  security: {
    parent: '',
    path: 'security',
  },

  unauthorized: {
    parent: '',
    path: 'unauthorized',
  },

  // #endregion

  // #region accounting-operation-routing module

  operacion_contable_mis_volantes_pendientes: {
    permission: PermissionsLibrary.ROUTE_OPERACION_CONTABLE,
    parent: 'operacion-contable',
    path: 'mis-volantes-pendientes',
  },
  operacion_contable_mesa_de_control: {
    permission: PermissionsLibrary.ROUTE_OPERACION_CONTABLE,
    parent: 'operacion-contable',
    path: 'mesa-de-control',
  },
  operacion_contable_volantes_en_libros: {
    permission: PermissionsLibrary.ROUTE_OPERACION_CONTABLE,
    parent: 'operacion-contable',
    path: 'volantes-en-libros',
  },
  operacion_contable_todos_los_volantes: {
    permission: PermissionsLibrary.ROUTE_OPERACION_CONTABLE,
    parent: 'operacion-contable',
    path: 'todos-los-volantes',
  },

  // #endregion

  // #region accounting-dashboards-routing module

  tableros_saldos_y_balanzas: {
    permission: PermissionsLibrary.ROUTE_TABLEROS,
    parent: 'tableros',
    path: 'saldos-y-balanzas',
  },
  tableros_calculo_de_agrupaciones: {
    permission: PermissionsLibrary.ROUTE_TABLEROS,
    parent: 'tableros',
    path: 'calculo-de-agrupaciones',
  },
  tableros_indicadores_financieros: {
    permission: PermissionsLibrary.ROUTE_TABLEROS,
    parent: 'tableros',
    path: 'indicadores-financieros',
  },
  tableros_alertas: {
    permission: PermissionsLibrary.ROUTE_TABLEROS,
    parent: 'tableros',
    path: 'alertas',
  },

  // #endregion

  // #region accounting-reports-routing module

  reportes_regulatorios: {
    permission: PermissionsLibrary.ROUTE_REPORTES,
    parent: 'reportes',
    path: 'regulatorios',
  },
  reportes_operativos: {
    permission: PermissionsLibrary.ROUTE_REPORTES,
    parent: 'reportes',
    path: 'operativos',
  },
  reportes_financieros: {
    permission: PermissionsLibrary.ROUTE_REPORTES,
    parent: 'reportes',
    path: 'financieros',
  },
  reportes_todos: {
    permission: PermissionsLibrary.ROUTE_REPORTES,
    parent: 'reportes',
    path: 'todos',
  },

  // #endregion

  // #region accounting-catalogues-and-rules-routing module

  reglas_y_catalogos_catalogos_de_cuentas: {
    permission: PermissionsLibrary.ROUTE_REGLAS_Y_CATALOGOS,
    parent: 'reglas-y-catalogos',
    path: 'catalogos-de-cuentas',
  },
  reglas_y_catalogos_reglas_contabilizadoras: {
    permission: PermissionsLibrary.ROUTE_REGLAS_Y_CATALOGOS,
    parent: 'reglas-y-catalogos',
    path: 'reglas-contabilizadoras',
  },
  reglas_y_catalogos_agrupaciones: {
    permission: PermissionsLibrary.ROUTE_REGLAS_Y_CATALOGOS,
    parent: 'reglas-y-catalogos',
    path: 'agrupaciones',
  },
  reglas_y_catalogos_disenador_de_reportes: {
    permission: PermissionsLibrary.ROUTE_REGLAS_Y_CATALOGOS,
    parent: 'reglas-y-catalogos',
    path: 'disenador-de-reportes',
  },

  // #endregion

  // #region system-management-routing module

  administracion_generacion_de_saldos: {
    permission: PermissionsLibrary.ROUTE_ADMINISTRACION,
    parent: 'administracion',
    path: 'generacion-de-saldos',
  },

  // #endregion

  // #region security-routing module

  security_login: {
    parent: 'security',
    path: 'login',
  },

  // #endregion

};


export const DEFAULT_ROUTE = ROUTES_LIBRARY.tableros_saldos_y_balanzas;


export const DEFAULT_URL = ( DEFAULT_ROUTE.parent ? DEFAULT_ROUTE.parent + '/' : '' ) + DEFAULT_ROUTE.path;


export const UNAUTHORIZED_ROUTE = ROUTES_LIBRARY.unauthorized.path;


export const ROUTES_LIST = Object.keys(ROUTES_LIBRARY)
                                 .map(key => ROUTES_LIBRARY[key])
                                 .filter(x => x.parent && x.permission);


// data dummy
export function getPermissionsList() {
  return Object.keys(PermissionsLibrary)
               .map(key => PermissionsLibrary[key])
               .filter(x => !x.includes('reportes'));
}