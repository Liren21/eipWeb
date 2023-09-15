export interface ColumnDefinition {
    dataField: string;
    allowEditing: boolean;
    caption: string;
    dataType?: "string" | "number" | "boolean" | "object" | "date" | "datetime";
    validationRules?: boolean;
    lookup?: any;
    item: boolean;
    nestedColumns?: ColumnDefinition[];
    defaultSortOrder?:string
}
