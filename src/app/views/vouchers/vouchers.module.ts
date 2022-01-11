/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFlexLayoutModule } from '@app/shared/angular-flex-layout.module';
import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { SharedModule } from '@app/shared/shared.module';
import { SubledgerAccountsModule } from '../subledger-accounts/subledger-accounts.module';

import { ImporterDetailsTableComponent } from './vouchers-importer/importer-details-table.component';
import { VoucherCreatorComponent } from './voucher-creator/voucher-creator.component';
import { VoucherEditorComponent } from './voucher-editor/voucher-editor.component';
import { VoucherEntriesEditorComponent } from './voucher-entries-editor/voucher-entries-editor.component';
import { VoucherEntryEditorComponent } from './voucher-entry-editor/voucher-entry-editor.component';
import { VoucherEntryTableComponent } from './voucher-entry-table/voucher-entry-table.component';
import { VoucherFilterComponent } from './vouchers-explorer/voucher-filter.component';
import { VoucherHeaderComponent } from './voucher-header/voucher-header.component';
import { VoucherListComponent } from './vouchers-explorer/voucher-list.component';
import { VoucherListItemComponent } from './vouchers-explorer/voucher-list-item.component';
import { VoucherPrintableComponentViewerComponent } from './voucher-printable-viewer/voucher-printable-viewer.component';
import { VouchersExplorerComponent } from './vouchers-explorer/vouchers-explorer.component';
import { VouchersImporterComponent } from './vouchers-importer/vouchers-importer.component';
import { VoucherSpecialCaseEditorComponent } from './voucher-creator/voucher-special-case-editor.component';
import { VoucherSubmitterComponent } from './voucher-editor/voucher-submitter.component';
import { VoucherTabbedViewComponent } from './voucher-tabbed-view/voucher-tabbed-view.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AngularFlexLayoutModule,
    SharedModule,
    SubledgerAccountsModule,
  ],
  declarations: [
    ImporterDetailsTableComponent,
    VoucherCreatorComponent,
    VoucherEditorComponent,
    VoucherEntriesEditorComponent,
    VoucherEntryEditorComponent,
    VoucherEntryTableComponent,
    VoucherFilterComponent,
    VoucherHeaderComponent,
    VoucherListComponent,
    VoucherListItemComponent,
    VoucherPrintableComponentViewerComponent,
    VouchersExplorerComponent,
    VouchersImporterComponent,
    VoucherSpecialCaseEditorComponent,
    VoucherSubmitterComponent,
    VoucherTabbedViewComponent,
  ],
  exports: [
    VoucherCreatorComponent,
    VoucherPrintableComponentViewerComponent,
    VouchersExplorerComponent,
    VouchersImporterComponent,
    VoucherTabbedViewComponent,
  ]
})
export class VouchersModule { }
