import { ColumnDefinition} from "../../../lib/store/models/true/columns";

export const columns:ColumnDefinition[] = [
    {
        dataField: "id",
        allowEditing: false,
        caption: "id",
        dataType: "number",
        validationRules:true,
        item:false,
    },
    {
        dataField: "sortIndex",
        allowEditing: false,
        caption: "Сортировочный индекс",
        dataType: "number",
        validationRules:true,
        item:false,
    },
    {
        dataField: "name",
        allowEditing: true,
        caption: "Имя",
        dataType: "string",
        validationRules:true,
        item:true,
    },
    {
        dataField: "group",
        allowEditing: true,
        caption: "Группа",
        dataType: "string",
        validationRules:true,
        item:true,
    },
    {
        dataField: "note",
        allowEditing: true,
        caption: "Причечание",
        dataType: "string",
        validationRules:true,
        item:true,
    },
    {
        dataField: "style",
        allowEditing: true,
        caption: "Стиль",
        dataType: "string",
        validationRules:true,
        item:true,
    },
];

