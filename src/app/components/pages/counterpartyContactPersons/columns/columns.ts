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
        dataField: "lastName",
        allowEditing: true,
        caption: "Фамилия",
        dataType: "string",
        validationRules: validationRules,
        item:true,
    },
    {
        dataField: "firstName",
        allowEditing: true,
        caption: "Имя",
        dataType: "string",
        validationRules: validationRules,
        item:true,
    },
    {
        dataField: "patronymicName",
        allowEditing: true,
        caption: "Отчество",
        dataType: "string",
        validationRules: validationRules,
        item:true,
    },
    {
        dataField: "phone",
        allowEditing: true,
        caption: "Телефон",
        dataType: "string",
        validationRules: validationRules,
        item:true,
    },
    {
        dataField: "mobilePhone",
        allowEditing: true,
        caption: "Мобильный телефон",
        dataType: "string",
        validationRules: validationRules,
        item:true,
    },
    {
        dataField: "email",
        allowEditing: true,
        caption: "Почта",
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
        dataField: "isMain",
        allowEditing: true,
        caption: "Основной",
        dataType: "boolean",
        item:true,
    },
    {
        dataField: "counterpartyId",
        allowEditing: true,
        caption: "Идентификатор контрагента",
        dataType: "number",
        validationRules: validationRules,
        lookup: true, // Добавьте этот параметр для колонок с поиском
        item:true,
    },
];

