/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';

import { Assertion } from '@app/core';

import { RulesDataService } from '@app/data-services';

import { DataTable, EmptyGroupingRule, GroupingRuleCommand } from '@app/models';

import { MessageBoxService } from '@app/shared/containers/message-box';

import { DataTableEventType } from '@app/views/reports-controls/data-table/data-table.component';

import {
  ExportReportModalEventType
} from '@app/views/reports-controls/export-report-modal/export-report-modal.component';

import { GroupingRulesFilterEventType } from './grouping-rules-filter.component';


@Component({
  selector: 'emp-fa-grouping-rules-viewer',
  templateUrl: './grouping-rules-viewer.component.html',
})
export class GroupingRulesViewerComponent {

  rulesSetName = '';

  cardHint = 'Selecciona los filtros';

  isLoading = false;

  submitted = false;

  commandExecuted = false;

  groupingRuleData: DataTable = EmptyGroupingRule;

  displayExportModal = false;

  excelFileUrl = '';

  constructor(private rulesData: RulesDataService,
              private messageBox: MessageBoxService) { }


  onGroupingRulesFilterEvent(event) {
    if (this.submitted) {
      return;
    }

    switch (event.type as GroupingRulesFilterEventType) {

      case GroupingRulesFilterEventType.SEARCH_GROUPING_RULES_CLICKED:
        Assertion.assertValue(event.payload.groupingRuleCommand, 'event.payload.groupingRuleCommand');
        Assertion.assertValue(event.payload.rulesSetName, 'event.payload.rulesSetName');

        this.commandExecuted = true;
        this.rulesSetName = event.payload.rulesSetName;
        this.getGroupingRules(event.payload.groupingRuleCommand as GroupingRuleCommand);
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  onGroupingRulesTableEvent(event) {
    switch (event.type as DataTableEventType) {

      case DataTableEventType.COUNT_FILTERED_ITEMS:
        Assertion.assertValue(event.payload, 'event.payload');
        this.setText(event.payload);
        return;

      case DataTableEventType.EXPORT_DATA:
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
        if (this.submitted || !this.groupingRuleData.command['accountsChartUID'] ) {
          return;
        }

        this.exportGroupingRulesToExcel();
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  private getGroupingRules(command: GroupingRuleCommand) {
    this.setSubmitted(true);

    this.rulesData.getGroupingRules(command.rulesSetUID)
      .toPromise()
      .then(x => {
        this.groupingRuleData = Object.assign({}, this.groupingRuleData, {command, entries: x});
        this.setText();
      })
      .finally(() => this.setSubmitted(false));
  }


  private exportGroupingRulesToExcel() {
    setTimeout(() => {
      this.excelFileUrl = 'data-dummy';
      this.messageBox.showInDevelopment({type: 'EXPORT_GROPING_RULES',
        command: this.groupingRuleData.command});
    }, 500);
  }


  private setText(itemsDisplayed?: number) {
    if (!this.commandExecuted) {
      this.cardHint = 'Selecciona los filtros';
      return;
    }

    if (typeof itemsDisplayed === 'number' && itemsDisplayed !== this.groupingRuleData.entries.length) {
      this.cardHint = `${this.rulesSetName} - ${itemsDisplayed} de ` +
        `${this.groupingRuleData.entries.length} registros mostrados`;
      return;
    }

    this.cardHint = `${this.rulesSetName} - ${this.groupingRuleData.entries.length} registros encontrados`;
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