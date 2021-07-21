/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { EventInfo } from '@app/core';

import { EmptyVoucher, Voucher } from '@app/models';

import { sendEvent } from '@app/shared/utils';

import { VoucherEditorEventType } from '../voucher-editor/voucher-editor.component';

export enum VoucherTabbedViewEventType {
  CLOSE_BUTTON_CLICKED = 'VoucherTabbedViewComponent.Event.CloseButtonClicked',
  VOUCHER_UPDATED = 'VoucherTabbedViewComponent.Event.VoucherUpdated',
  VOUCHER_DELETED = 'VoucherTabbedViewComponent.Event.VoucherDeleted',
}

@Component({
  selector: 'emp-fa-voucher-tabbed-view',
  templateUrl: './voucher-tabbed-view.component.html',
})
export class VoucherTabbedViewComponent implements OnChanges {

  @Input() voucher: Voucher = EmptyVoucher;

  @Output() voucherTabbedViewEvent = new EventEmitter<EventInfo>();

  title = '';
  hint = '';
  selectedTabIndex = 0;

  ngOnChanges() {
    this.setTitle();
  }


  onClose() {
    sendEvent(this.voucherTabbedViewEvent, VoucherTabbedViewEventType.CLOSE_BUTTON_CLICKED);
  }


  onVoucherEditorEvent(event: EventInfo) {
    switch (event.type as VoucherEditorEventType) {

      case VoucherEditorEventType.VOUCHER_UPDATED:
        sendEvent(this.voucherTabbedViewEvent, VoucherTabbedViewEventType.VOUCHER_UPDATED,
          event.payload);
        return;

      case VoucherEditorEventType.VOUCHER_DELETED:
        sendEvent(this.voucherTabbedViewEvent, VoucherTabbedViewEventType.VOUCHER_DELETED,
          event.payload);
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  private setTitle() {
    this.title = `${this.voucher.number}: ${this.voucher.voucherType.name}`;
    this.hint = this.voucher.ledger.name;
  }

}
