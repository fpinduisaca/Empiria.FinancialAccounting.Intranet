/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { AngularFlexLayoutModule } from '@app/shared/angular-flex-layout.module';
import { SharedModule } from '@app/shared/shared.module';

import { ReportsControlsModule } from '../reports-controls/reports-controls.module';

import { GroupingRulesFilterComponent } from './grouping-rules-viewer/grouping-rules-filter.component';
import { GroupingRulesViewerComponent } from './grouping-rules-viewer/grouping-rules-viewer.component';
import { GroupingRuleTabbedViewComponent } from './grouping-rule-tabbed-view/grouping-rule-tabbed-view.component';
import { GroupingRuleItemsTableComponent } from './grouping-rule-items-table/grouping-rule-items-table.component';


@NgModule({
  declarations: [
    GroupingRuleItemsTableComponent,
    GroupingRulesFilterComponent,
    GroupingRulesViewerComponent,
    GroupingRuleTabbedViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule,
    AngularFlexLayoutModule,
    SharedModule,

    ReportsControlsModule,
  ],
  exports: [
    GroupingRulesViewerComponent,
    GroupingRuleTabbedViewComponent,
  ]
})
export class GroupingRulesModule { }
