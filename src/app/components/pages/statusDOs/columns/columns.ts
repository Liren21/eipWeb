import { ColumnDefinition} from "../../../../lib/models/columns";

export const columns:ColumnDefinition[] = [
    {
        dataField: "id",
        allowEditing: false,
        caption: "ID",
        dataType: "number",
        item:false,
    },
    {
        dataField: "name",
        allowEditing: true,
        caption: "Наименование",
        dataType: "string",
        item:true,
    },
    {
        dataField: "sortIndex",
        allowEditing: true,
        caption: "Сортировка",
        dataType: "number",
        item:true,
    },
    {
        dataField: "note",
        allowEditing: true,
        caption: "Примечание",
        dataType: "string",
        item:true,
    },
];

