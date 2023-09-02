import {validationRules} from "../../../generic/Validation/ValidationRules";
import { ColumnDefinition} from "../../../lib/store/models/true/columns";

export const columns:ColumnDefinition[] = [
    {
        dataField: "id",
        allowEditing: false,
        caption: "Идентификатор",
        dataType: "number",
        item:false,
    },
    {
        dataField: "name",
        allowEditing: true,
        caption: "Имя",
        dataType: "string",
        validationRules: validationRules,
        item:true,
    },
    {
        dataField: "note",
        allowEditing: true,
        caption: "Примечание",
        dataType: "string",
        validationRules: validationRules,
        item:true,
    },
    {
        dataField: "inn",
        allowEditing: true,
        caption: "ИНН",
        dataType: "string",
        validationRules: validationRules,
        item:true,
    },
    {
        dataField: "counterpartyFormatId",
        allowEditing: true,
        caption: "Идентификатор формата контрагента",
        dataType: "number",
        validationRules: validationRules,
        lookup: true, // Добавьте этот параметр для колонок с поиском
        item:true,
    },
    {
        dataField: "customerClassificationId",
        allowEditing: true,
        caption: "Классификация заказчика",
        dataType: "number",
        validationRules: validationRules,
        lookup: true, // Добавьте этот параметр для колонок с поиском
        item:true,
    },
    {
        dataField: "counterpartyStatusId",
        allowEditing: true,
        caption: "Классификация контрагента",
        dataType: "number",
        validationRules: validationRules,
        lookup: true, // Добавьте этот параметр для колонок с поиском
        item:true,
    },
    {
        dataField: "providerClassifications.id",
        allowEditing: true,
        caption: "Классификация поставщика",
        dataType: "number",
        validationRules: validationRules,
        lookup: true, // Добавьте этот параметр для колонок с поиском
        item:true,
    },
    {
        dataField: "subcontractorClassifications.id",
        allowEditing: true,
        caption: "Классификация субподрядчика",
        dataType: "number",
        validationRules: validationRules,
        lookup: true, // Добавьте этот параметр для колонок с поиском
        item:true,
    },
    {
        dataField: "isWithOutNDS",
        allowEditing: true,
        caption: "Продается без учета НДС",
        dataType: "boolean",
        item:true,
    },
    {
        dataField: "isCustomer",
        allowEditing: true,
        caption: "Клиент",
        dataType: "boolean",
        item:true,
    },
    // Добавьте другие колонки по аналогии
];

