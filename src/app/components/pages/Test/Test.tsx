import React, {useCallback, useEffect, useReducer} from 'react';
import {Column, Editing, Lookup, Popup,} from 'devextreme-react/data-grid';
import urls from "../../../lib/urls";
import reducer from "../../../../core/lib/api/reducer";
import {counterpartyFormatsService} from "../../../lib/services/counterpartyFormatsService";
import {customerClassificationsService} from "../../../lib/services/сustomerClassificationsService";
import {counterpartyStatusService} from "../../../lib/services/counterpartyStatusService";
import {providerClassificationsService} from "../../../lib/services/providerClassificationsService";
import {subcontractorClassificationsService} from "../../../lib/services/subcontractorClassificationsService";
import {loadOrders, saveChange, setChanges, setEditRowKey} from "../../../../core/lib/api/actions";
import {ProcessClassifications, ProcessClassificationsObj} from "../../../generic/Function/ProcessClassifications";
import {CustomDataGrid} from '../../UI/CustomDataGrid/CustomDataGrid';
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import {DataColumns} from "../counterparties/columns/DataColumns";
import Form from 'devextreme-react/form';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faHouse} from "@fortawesome/free-solid-svg-icons";


const TableVariable = {
    data: [],
    changes: [],
    editRowKey: null,
    isLoading: false,
};
export const Test = () => {
    const URL: string = urls.COUNTERPARTIES
    const URLTest: string[] = [urls.COUNTERPARTIES,urls.COUNTERPARTY_FORMATS,urls.CUSTOMER_CLASSIFICATIONS]
    const [state, dispatch] = useReducer(reducer, TableVariable);
    const {
        data: counterpartyFormats,
        refetch: reCounterpartyFormats
    } = counterpartyFormatsService.useFetchCounterpartyFormatsQuery('')
    const {
        data: customerClassifications,
        refetch: reCustomerClassifications
    } = customerClassificationsService.useFetchCustomerClassificationsQuery('')
    const {
        data: counterpartyStatus,
        refetch: reCounterpartyStatus
    } = counterpartyStatusService.useFetchCounterpartyStatusQuery('')
    const {
        data: providerClassifications,
        refetch: reProviderClassifications
    } = providerClassificationsService.useFetchProviderClassificationsServiceQuery('')
    const {
        data: subcontractorClassifications,
        refetch: reSubcontractorClassifications
    } = subcontractorClassificationsService.useFetchSubcontractorClassificationsQuery('')


    useEffect(() => {
        loadOrders(dispatch, URL);
        reCounterpartyFormats()
        reCustomerClassifications()
        reCounterpartyStatus()
        reProviderClassifications()
        reSubcontractorClassifications()
    }, [URL, reCounterpartyFormats, reCounterpartyStatus, reCustomerClassifications, reProviderClassifications, reSubcontractorClassifications]);


    const onSaving = useCallback((e: any) => {
        ProcessClassifications(e, 'providerClassifications[0]', 'providerClassifications');
        ProcessClassifications(e, 'subcontractorClassifications[0]', 'subcontractorClassifications');

        ProcessClassificationsObj(e.changes[0].data, "counterpartyFormat");
        ProcessClassificationsObj(e.changes[0].data, "customerClassification");
        ProcessClassificationsObj(e.changes[0].data, "counterpartyStatus");
        e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, [URL]);

    const onChangesChange = useCallback((changes) => {
        console.log(changes)
        setChanges(dispatch, changes);
    }, []);

    const onEditRowKeyChange = useCallback((editRowKey) => {
        setEditRowKey(dispatch, editRowKey);
    }, []);

    return (

      <div>
          <FontAwesomeIcon icon={faHouse} />
      </div>
    )
}
