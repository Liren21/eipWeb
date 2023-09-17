export const dataFormItems = [
    {
        itemCaption: '',
        data: [
            {
                dataField: "counterpartyFormat.id",
                label: "Формат контрагента"
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
                label: "ID номер клиента"
            },
            {
                dataField: "isSubcontractor",
            },
            {
                dataField: "isProvider",
            },
            {
                dataField: "counterpartyStatus.id",
                label:'ID статуса контрагента'
            },
            {
                dataField: "providerClassifications[0].name",
                label: "Классификации поставщика"
            },
            {
                dataField: "subcontractorClassifications[0].name",
                label: "Классификация субподрядчика"
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
