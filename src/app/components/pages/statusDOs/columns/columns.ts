import { ColumnDefinition} from "../../../../lib/models/columns";

export const columns:ColumnDefinition[] = [
    {
        dataField: "id",
        allowEditing: false,
        caption: "ИД",
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
        dataField: "sortIndex",
        allowEditing: true,
        caption: "Сортировочный индекс",
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

