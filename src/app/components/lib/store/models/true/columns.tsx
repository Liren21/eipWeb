export interface ColumnDefinition {
    dataField: string;
    allowEditing: boolean;
    caption: string;
    dataType: "string" | "number" | "boolean" | "object" | "date" | "datetime";
    validationRules?: any[]; // Замените any[] на более конкретный тип, если у вас есть строгие правила валидации
    lookup?: boolean; // Добавьте этот параметр, если колонка должна иметь поиск
    item:boolean
}
