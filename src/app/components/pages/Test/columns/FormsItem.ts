export const dataFormItems = [
    {
        itemCaption: '',
        data: [
            {
                dataField: "counterpartyFormat.id",
            },
            {
                dataField: "name",
            },
            {
                dataField: "inn",
            },
            {
                dataField: "isWithOutNDS",
            },
            {
                dataField: "isCustomer",
            },
            {
                dataField: "customerClassification.id",
            },
            {
                dataField: "isSubcontractor",
            },
            {
                dataField: "isProvider",
            },
            {
                dataField: "counterpartyStatus.id",
            },
            {
                dataField: "providerClassifications[0].name",
            },
            {
                dataField: "subcontractorClassifications[0].name",
            },
        ]
    },
    {
        itemCaption: 'Классификация заказчика',
        data: [
            {
                dataField: "customerClassification.note",
            },

        ]
    },
    {
        itemCaption: 'Классификация субподрядчика',
        data: [
            {
                dataField: "subcontractorClassifications[0].note",
            },

        ]
    },
]
