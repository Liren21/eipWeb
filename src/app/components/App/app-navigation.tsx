export const navigation = [
    {
        text: "Главная",
        path:'/home',
        items: []
    },
    {
        text: "Справочники",
        items: [
            {
                text: 'Формат контрагента',
                path: '/counterpartyFormats',
            },
            {
                text: 'Классификация заказчика',
                path: '/customerClassifications',
            },
            {
                text: 'Классификация субподрядчика',
                path: '/subcontractorClassifications',
            },
            {
                text: 'Классификация поставщика',
                path: '/providerClassifications',
            },
            {
                text: 'Статус контрагента',
                path: '/counterpartyStatus',
            },
            {
                text: 'Названия РЭС',
                path: '/rases',
            },
            {
                text: 'Категория договора',
                path: '/contractCategories',
            },
            {
                text: 'Статус ДО',
                path: '/statusDOs',
            },
        ]
    },
    {
        text: "Реестры",
        items: [

            {
                text: 'Контрагенты',
                path: '/counterparties',
            },
            {
                text: 'Контакты информации по контрагенту',
                path: '/counterpartyContactPersons',
            },
            {
                text: 'Договоры',
                path: '/contracts',

            },
            {
                text: 'Сотрудники',
                path: '/employees',
            },
        ]
    },
]
