export interface ColumnDefinition {
    dataField: string;
    allowEditing: boolean;
    caption: string;
    dataType: "string" | "number" | "boolean" | "object" | "date" | "datetime";
    validationRules?: boolean;
    lookup?: boolean; // Добавьте этот параметр, если колонка должна иметь поиск
    item:boolean

}
