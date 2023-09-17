
import {ColumnDefinition} from "../../../../lib/models/columns";

export const DataColumns:ColumnDefinition[] = [
    {
        dataField: 'subcontractorClassifications[0].name',
        allowEditing: true,
        visible: true,
        caption: 'Классификация субподрядчика',
        dataType: 'number',
        validationRules: true,
        lookup:
            {
                // dataSource: subcontractorClassifications,
                valueExpr: "id",
                displayExpr: 'name',
            }

    },
]
