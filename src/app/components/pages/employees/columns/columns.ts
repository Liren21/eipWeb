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
        dataField: "lastName",
        allowEditing: true,
        caption: "Фамилия",
        dataType: "string",
        validationRules:true,
        item:true,
    },
    {
        dataField: "firstName",
        allowEditing: true,
        caption: "Имя",
        dataType: "string",
        validationRules:true,
        item:true,
    },
    {
        dataField: "patronymicName",
        allowEditing: true,
        caption: "Отчество",
        dataType: "string",
        item:true,
    },
    {
        dataField: "departmentId",
        allowEditing: true,
        caption: "ID отдела",
        dataType: "number",
        validationRules:true,
        item:true,
    },
    {
        dataField: "positionId",
        allowEditing: true,
        caption: "ID позиции",
        dataType: "string",
        item:true,
    },
];

