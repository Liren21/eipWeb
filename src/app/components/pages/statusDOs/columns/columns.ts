import { ColumnDefinition} from "../../../lib/store/models/true/columns";

export const columns:ColumnDefinition[] = [
    {
        dataField: "id",
        allowEditing: false,
        caption: "id",
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
        dataType: "number",
        item:true,
    },
];

