interface DataColumn {
    dataField: string;
    caption: string;
    nestedColumns?: DataColumn[];
    dataType?: "string" | "number" | "boolean" | "object" | "date" | "datetime";
    allowEditing?: boolean;
}

export const dataColumns: DataColumn[] = [
    {
        dataField: 'address',
        caption: 'Адрес договора',
        dataType: 'string'
    },
    {
        dataField: 'title',
        caption: 'Титул полный',
        dataType: 'string'
    },
    {
        dataField: 'contractSigningOption',
        caption: 'Вариант подписания договора',
        dataType: 'string'
    },
    {
        dataField: 'noteDO',
        caption: 'Примечание от ДО',
        dataType: 'string'
    },
    {
        dataField: 'numberTechTask',
        caption: 'Номер ТЗ',
        dataType: 'string'
    },
    {
        dataField: 'createdDate',
        caption: 'Дата создания',
        dataType: 'datetime'
    },
    {
        dataField: 'conclusionContractDate',
        caption: 'Дата заключения договора',
        dataType: 'datetime'
    },
    {
        dataField: 'returnSignContractDate',
        caption: 'Дата возврата подписанного договора',
        dataType: 'datetime'
    },
    {
        dataField: 'startDate',
        caption: 'Дата начала работ по договору',
        dataType: 'datetime'
    },
    {
        dataField: 'endDate',
        caption: 'Дата окончания работ по договору',
        dataType: 'datetime'
    },
    {
        dataField: 'cancellationDate',
        caption: 'Дата аннуляции договора',
        dataType: 'datetime'
    },
    {
        dataField: 'terminationDate',
        caption: 'Дата расторжения договора',
        dataType: "datetime"
    },
    {
        dataField: 'summaPIR',
        caption: 'Сумма | ПИР',
        dataType: 'number'
    },
    {
        dataField: 'summaSMR',
        caption: 'Сумма | СМР',
        dataType: 'number'
    },
    {
        dataField: 'summaEquipment',
        caption: 'Сумма | Оборудование',
        dataType: 'number'
    },
    {
        dataField: 'summaOther',
        caption: 'Сумма | Прочее',
        dataType: 'number'
    },
    {
        dataField: 'updateStatusDODate',
        caption: 'Обновление даты статуса ДО',
        dataType: 'datetime'
    },
    {
        dataField: 'contractNumberCustomer',
        caption: 'Номер договора с заказчиком',
        dataType: 'string'
    },
    {
        dataField: 'contractNumberSubcontractor',
        caption: 'Номер договора с субподрядчиком',
        dataType: 'string'
    },
    {
        dataField: 'contractNumberProvider',
        caption: 'Номер договора с поставщиком',
        dataType: 'string'
    },
    {
        dataField: 'additionalAgreementCustomer',
        caption: 'Номер дополнительного соглашения с заказчиком',
        dataType: 'string'
    },
    {
        dataField: 'additionalAgreementSubcontractor',
        caption: 'Номер дополнительного соглашения с субподрядчиком',
        dataType: 'string'
    },
    {
        dataField: 'additionalAgreementProvider',
        caption: 'Номер дополнительного соглашения с поставщиком',
        dataType: 'string'
    },
    {
        dataField: 'noSap',
        caption: 'No SAP',
        dataType: 'string'
    },
    {
        dataField: 'subscriber',
        caption: 'Абонент',
        dataType: 'string'
    },
    {
        dataField: 'contractCategory',
        caption: 'Категория договора',
        nestedColumns: [
            {
                dataField: "contractCategory.id",
                caption: 'ID',
                dataType: 'number',
                allowEditing: false
            },
            {
                dataField: "contractCategory.sortIndex",
                caption: 'Сортировка',
                dataType: 'number',
                allowEditing: false
            },
            {
                dataField: "contractCategory.name",
                caption: 'Наименование',
                dataType: 'string',
                allowEditing: false
            },
            {
                dataField: "contractCategory.group",
                caption: 'Группа',
                dataType: 'string',
                allowEditing: false
            },
            {
                dataField: "contractCategory.note",
                caption: 'Примечание',
                dataType: 'string',
                allowEditing: false
            },
            {
                dataField: "contractCategory.contractNumberCustomer",
                caption: 'Номер договора с заказчиком',
                dataType: 'string',
                allowEditing: false
            },
            {
                dataField: "contractCategory.contractNumberProvider",
                caption: 'Номер договора с поставщиком',
                dataType: 'string',
                allowEditing: false
            },
            {
                dataField: "contractCategory.contractNumberSubcontractor",
                caption: 'Номер договора с субподрядчиком',
                dataType: 'string',
                allowEditing: false
            },
        ]
    },
    {
        dataField: 'counterpartyCustomer',
        caption: 'Контрагент-заказчик',
        nestedColumns: [
            {
                dataField: "counterpartyCustomer.counterpartyFormatId",
                caption: 'ID формата контрагента',
                dataType: 'number'
            },
            {
                dataField: "counterpartyCustomer.counterpartyStatusId",
                caption: 'ID статуса контрагента',
                dataType: 'number'
            },
            {
                dataField: "counterpartyCustomer.customerClassificationId",
                caption: 'ID номер клиента',
                dataType: 'number'
            },
            {
                dataField: "counterpartyCustomer.id",
                caption: 'ID',
                dataType: 'number',
                allowEditing: false
            },
            {
                dataField: "counterpartyCustomer.inn",
                caption: 'ИНН',
                dataType: 'string'
            },
            {
                dataField: "counterpartyCustomer.isCustomer",
                caption: 'Заказчик',
                dataType: 'boolean'
            },
            {
                dataField: "counterpartyCustomer.isProvider",
                caption: 'Поставщик',
                dataType: 'boolean'
            },
            {
                dataField: "counterpartyCustomer.isSubcontractor",
                caption: 'Субподрядчик',
                dataType: 'boolean'
            },
            {
                dataField: "counterpartyCustomer.isWithOutNDS",
                caption: 'Продается без учета НДС',
                dataType: 'boolean'
            },
            {
                dataField: "counterpartyCustomer.name",
                caption: 'Наименование',
                dataType: 'string'
            },
            {
                dataField: "counterpartyCustomer.note",
                caption: 'Примечание',
                dataType: 'string'
            },
        ]
    },
    {
        dataField: 'counterpartySubcontractor',
        caption: 'Контрагент субподрядчик',
        nestedColumns: [
            {
                dataField: "counterpartySubcontractor.counterpartyFormatId",
                caption: 'ID формата контрагента',
                dataType: 'number'
            },
            {
                dataField: "counterpartySubcontractor.counterpartyStatusId",
                caption: 'ID статуса контрагента',
                dataType: 'number'
            },
            {
                dataField: "counterpartySubcontractor.customerClassificationId",
                caption: 'ID номер клиента',
                dataType: 'number'
            },
            {
                dataField: "counterpartySubcontractor.id",
                caption: 'ID',
                dataType: 'number',
                allowEditing: false
            },
            {
                dataField: "counterpartySubcontractor.inn",
                caption: 'ИНН',
                dataType: 'string'
            },
            {
                dataField: "counterpartySubcontractor.isCustomer",
                caption: 'Заказчик',
                dataType: 'boolean'
            },
            {
                dataField: "counterpartySubcontractor.isProvider",
                caption: 'Поставщик',
                dataType: 'boolean'
            },
            {
                dataField: "counterpartySubcontractor.isSubcontractor",
                caption: 'Субподрядчик',
                dataType: 'boolean'
            },
            {
                dataField: "counterpartySubcontractor.isWithOutNDS",
                caption: 'Продается без учета НДС',
                dataType: 'boolean'
            },
            {
                dataField: "counterpartySubcontractor.name",
                caption: 'Наименование',
                dataType: 'string'
            },
            {
                dataField: "counterpartySubcontractor.note",
                caption: 'Примечание',
                dataType: 'string'
            },
        ]
    },
    {
        dataField: 'counterpartyProvider',
        caption: 'Контрагент поставщик',
        nestedColumns: [
            {
                dataField: "counterpartyProvider.counterpartyFormatId",
                caption: 'ID формата контрагента',
                dataType: 'number'
            },
            {
                dataField: "counterpartyProvider.counterpartyStatusId",
                caption: 'ID статуса контрагента',
                dataType: 'number'
            },
            {
                dataField: "counterpartyProvider.customerClassificationId",
                caption: 'ID номер клиента',
                dataType: 'number'
            },
            {
                dataField: "counterpartyProvider.id",
                caption: 'ID',
                dataType: 'number',
                allowEditing: false
            },
            {
                dataField: "counterpartyProvider.inn",
                caption: 'ИНН',
                dataType: 'string'
            },
            {
                dataField: "counterpartyProvider.isCustomer",
                caption: 'Заказчик',
                dataType: 'boolean'
            },
            {
                dataField: "counterpartyProvider.isProvider",
                caption: 'Поставщик',
                dataType: 'boolean'
            },
            {
                dataField: "counterpartyProvider.isSubcontractor",
                caption: 'Субподрядчик',
                dataType: 'boolean'
            },
            {
                dataField: "counterpartyProvider.isWithOutNDS",
                caption: 'Продается без учета НДС',
                dataType: 'boolean'
            },
            {
                dataField: "counterpartyProvider.name",
                caption: 'Наименование',
                dataType: 'string'
            },
            {
                dataField: "counterpartyProvider.note",
                caption: 'Примечание',
                dataType: 'string'
            },
        ]
    },
    {
        dataField: 'projectEmployee',
        caption: 'Сотрудник проекта',
        nestedColumns: [
            {
                dataField: "projectEmployee.id",
                caption: 'ID',
                dataType: 'number'
            },
            {
                dataField: "projectEmployee.lastName",
                caption: 'Фамилия',
                dataType: 'string'
            },
            {
                dataField: "projectEmployee.firstName",
                caption: 'Имя',
                dataType: 'string'
            },
            {
                dataField: "projectEmployee.patronymicName",
                caption: 'Отчество',
                dataType: 'string'
            },
            {
                dataField: "projectEmployee.isActive",
                caption: 'Активен',
                dataType: 'boolean'
            },
            {
                dataField: "projectEmployee.departmentId",
                caption: 'ID отдела',
                dataType: 'number'
            },
            {
                dataField: "projectEmployee.positionId",
                caption: 'ID позиции',
                dataType: 'number'
            },
            {
                dataField: "projectEmployee.isViewHiddenCosts",
                caption: 'Просмотр скрытых затрат',
                dataType: 'boolean'
            },
        ]
    },
    {
        dataField: 'executorDO',
        caption: 'Исполнитель | ДО',
        nestedColumns: [
            {
                dataField: "executorDO.id",
                caption: 'ID',
                dataType: 'number'
            },
            {
                dataField: "executorDO.lastName",
                caption: 'Фамилия',
                dataType: 'string'
            },
            {
                dataField: "executorDO.firstName",
                caption: 'Имя',
                dataType: 'string'
            },
            {
                dataField: "executorDO.patronymicName",
                caption: 'Отчество',
                dataType: 'string'
            },
            {
                dataField: "executorDO.isActive",
                caption: 'Активен',
                dataType: 'boolean'
            },
            {
                dataField: "executorDO.departmentId",
                caption: 'ID отдела',
                dataType: 'number'
            },
            {
                dataField: "executorDO.positionId",
                caption: 'ID позиции',
                dataType: 'number'
            },
            {
                dataField: "executorDO.isViewHiddenCosts",
                caption: 'Просмотр скрытых затрат',
                dataType: 'boolean'
            },
        ]
    },
    {
        dataField: 'statusDO',
        caption: 'Статус ДО',
        nestedColumns: [
            {
                dataField: "statusDO.id",
                caption: 'ID',
                dataType: 'number'
            },
            {
                dataField: "statusDO.sortIndex",
                caption: 'Сортировка',
                dataType: 'number'
            },
            {
                dataField: "statusDO.name",
                caption: 'Наименование',
                dataType: 'string'
            },
        ]
    },
    {
        dataField: 'createdEmployee',
        caption: 'Созданный сотрудник',
        nestedColumns: [
            {
                dataField: "createdEmployee.departmentId",
                caption: 'ID отдела',
                dataType: 'number'
            },
            {
                dataField: "createdEmployee.lastName",
                caption: 'Фамилия',
                dataType: 'string'
            },
            {
                dataField: "createdEmployee.firstName",
                caption: 'Имя',
                dataType: 'string'
            },
            {
                dataField: "createdEmployee.patronymicName",
                caption: 'Отчество',
                dataType: 'string'
            },
            {
                dataField: "createdEmployee.id",
                caption: 'ID',
                dataType: 'number'
            },
            {
                dataField: "createdEmployee.isActive",
                caption: 'Активен',
                dataType: 'boolean'
            },
            {
                dataField: "createdEmployee.positionId",
                caption: 'ID позиции',
                dataType: 'number'
            },
            {
                dataField: "createdEmployee.isViewHiddenCosts",
                caption: 'Просмотр скрытых затрат',
                dataType: 'boolean'
            },
        ]
    },
    {
        dataField: 'updateStatusDOEmployee',
        caption: 'Созданный сотрудник статуса ДО',
        nestedColumns: [
            {
                dataField: "updateStatusDOEmployee.id",
                caption: 'ID',
                dataType: 'number'
            },
            {
                dataField: "updateStatusDOEmployee.lastName",
                caption: 'Фамилия',
                dataType: 'string'
            },
            {
                dataField: "updateStatusDOEmployee.firstName",
                caption: 'Имя',
                dataType: 'string'
            },
            {
                dataField: "updateStatusDOEmployee.patronymicName",
                caption: 'Отчество',
                dataType: 'string'
            },
            {
                dataField: "updateStatusDOEmployee.isActive",
                caption: 'Активен',
                dataType: 'boolean'
            },
            {
                dataField: "updateStatusDOEmployee.departmentId",
                caption: 'ID отдела',
                dataType: 'number'
            },
            {
                dataField: "updateStatusDOEmployee.positionId",
                caption: 'ID позиции',
                dataType: 'number'
            },
            {
                dataField: "updateStatusDOEmployee.isViewHiddenCosts",
                caption: 'Просмотр скрытых затрат',
                dataType: 'boolean'
            },
        ]
    },
    {
        dataField: 'ras',
        caption: 'РЭС',
        dataType: 'number',
        nestedColumns: [
            {
                dataField: "ras.id",
                caption: 'ID',
                dataType: 'number'
            },
            {
                dataField: "ras.sortIndex",
                caption: 'Сортировка',
                dataType: 'number'
            },
            {
                dataField: "ras.name",
                caption: 'Наименование',
                dataType: 'string'
            },
            {
                dataField: "ras.note",
                caption: 'Примечание',
                dataType: 'string'
            },
        ]
    },
];
