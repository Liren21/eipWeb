import { ColumnDefinition} from "../../../../lib/models/columns";

export const columns:ColumnDefinition[] = [
    {
        dataField: "id",
        allowEditing: false,
        caption: "ID",
        dataType: "number",
        item:false,
        defaultSortOrder:'asc'
    },
    {
        dataField: "sortIndex",
        allowEditing: true,
        caption: "Сортировка",
        dataType: "number",
        item:false,
    },
    {
        dataField: "name",
        allowEditing: true,
        caption: "Имя",
        dataType: "string",
        item:true,
    },
    {
        dataField: "group",
        allowEditing: true,
        caption: "Группа",
        dataType: "string",
        item:true,
    },
    {
        dataField: "note",
        allowEditing: true,
        caption: "Причечание",
        dataType: "string",
        item:true,
    },
    {
        dataField: "style",
        allowEditing: true,
        caption: "Цветовое обозначение",
        dataType: "string",
        item:true,
    },
];

