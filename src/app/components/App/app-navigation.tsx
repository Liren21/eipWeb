import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export const navigation = [
    {
        text: "Главная",
        path:'/home',
        icon:'home',
        items: []
    },
    {
        text: "Справочники",
        icon:'cut',
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
        icon:'eyeopen',
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
    {
        text: "Тестова страница",
        path:'/test',
        items: []
    },
]
