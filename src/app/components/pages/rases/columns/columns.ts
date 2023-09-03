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
        dataField: "name",
        allowEditing: true,
        caption: "Имя",
        dataType: "string",
        validationRules:true,
        item:true,
    },
    {
        dataField: "sortIndex",
        allowEditing: true,
        caption: "Сортировочный индекс",
        dataType: "number",
        validationRules:false,
        item:true,
    },
];

