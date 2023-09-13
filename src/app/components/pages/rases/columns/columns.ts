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
        dataField: "name",
        allowEditing: true,
        caption: "Наименование",
        dataType: "string",
        validationRules:true,
        item:true,
    },
    {
        dataField: "sortIndex",
        allowEditing: true,
        caption: "Сортировка",
        dataType: "number",
        validationRules:false,
        item:true,
    },
];

