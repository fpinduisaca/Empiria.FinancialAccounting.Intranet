/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Assertion, HttpService } from '@app/core';

import { SearchSubledgerAccountCommand, SubledgerAccount, SubledgerAccountDescriptor,
         SubledgerAccountFields } from '@app/models';


@Injectable()
export class SubledgerDataService {

  constructor(private http: HttpService) { }


  searchSubledgerAccounts(command: SearchSubledgerAccountCommand): Observable<SubledgerAccountDescriptor[]> {
    Assertion.assertValue(command, 'command');

    const path = 'v2/financial-accounting/subledger-accounts/search';

    return this.http.post<SubledgerAccountDescriptor[]>(path, command);
  }


  getSubledgerAccount(subledgerAccountId: number): Observable<SubledgerAccount> {
    Assertion.assertValue(subledgerAccountId, 'subledgerAccountId');

    const path = `v2/financial-accounting/subledger-accounts/${subledgerAccountId}`;

    return this.http.get<SubledgerAccount>(path);
  }


  createSubledgerAccount(subledgerAccountFields: SubledgerAccountFields): Observable<SubledgerAccount> {
    Assertion.assertValue(subledgerAccountFields, 'subledgerAccountFields');

    const path = `v2/financial-accounting/subledger-accounts`;

    return this.http.post<SubledgerAccount>(path, subledgerAccountFields);
  }


  updateSubledgerAccount(subledgerAccountId: number,
                         subledgerAccountFields: SubledgerAccountFields): Observable<SubledgerAccount> {
    Assertion.assertValue(subledgerAccountId, 'subledgerAccountId');
    Assertion.assertValue(subledgerAccountFields, 'subledgerAccountFields');

    const path = `v2/financial-accounting/subledger-accounts/${subledgerAccountId}`;

    return this.http.put<SubledgerAccount>(path, subledgerAccountFields);
  }


  activateSubledgerAccount(subledgerAccountId: number): Observable<SubledgerAccount> {
    Assertion.assertValue(subledgerAccountId, 'subledgerAccountId');

    const path = `v2/financial-accounting/subledger-accounts/${subledgerAccountId}/activate`;

    return this.http.post<SubledgerAccount>(path);
  }


  suspendSubledgerAccount(subledgerAccountId: number): Observable<SubledgerAccount> {
    Assertion.assertValue(subledgerAccountId, 'subledgerAccountId');

    const path = `v2/financial-accounting/subledger-accounts/${subledgerAccountId}/suspend`;

    return this.http.post<SubledgerAccount>(path);
  }

}
