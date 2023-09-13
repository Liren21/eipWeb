import { ColumnDefinition} from "../../../../lib/models/columns";

export const columns:ColumnDefinition[] = [
    {
        dataField: "id",
        allowEditing: false,
        caption: "ID",
        dataType: "number",
        validationRules:true,
        item:false,
    },
    {
        dataField: "sortIndex",
        allowEditing: false,
        caption: "Сортировка",
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

