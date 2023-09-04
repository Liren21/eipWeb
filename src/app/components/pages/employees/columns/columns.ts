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
        dataField: "lastName",
        allowEditing: true,
        caption: "Фамилия",
        dataType: "string",
        item:true,
    },
    {
        dataField: "firstName",
        allowEditing: true,
        caption: "Имя",
        dataType: "string",
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
        caption: "Ид отдела",
        dataType: "number",
        item:true,
    },
    {
        dataField: "positionId",
        allowEditing: true,
        caption: "Ид позиции",
        dataType: "string",
        item:true,
    },
];

