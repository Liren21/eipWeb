import {validationRules} from "../../../../generic/ValidationRules/ValidationRules";
interface ColumnConfig {
    dataField?: string;
    caption?: string;
    allowEditing?: boolean;
    dataType?: 'string' | 'number' | 'boolean' | 'object' | 'date' | 'datetime';
    validationRules?: any; // Тип данных зависит от ваших конкретных правил валидации
}
export const columns:ColumnConfig[] = [
    { dataField: 'id', caption: 'ID', allowEditing: false, dataType: 'number' },
    { dataField: 'lastName', caption: 'Фамилия', allowEditing: true, dataType: 'string', validationRules },
    { dataField: 'firstName', caption: 'Имя', allowEditing: true, dataType: 'string', validationRules },
    { dataField: 'patronymicName', caption: 'Отчество', allowEditing: true, dataType: 'string', validationRules },
    { dataField: 'phone', caption: 'Рабочий телефон', allowEditing: true, dataType: 'string', validationRules },
    { dataField: 'mobilePhone', caption: 'Мобильный телефон', allowEditing: true, dataType: 'string' },
    { dataField: 'email', caption: 'Электронный адрес', allowEditing: true, dataType: 'string' },
    { dataField: 'note', caption: 'Примечание', allowEditing: true, dataType: 'string' },
    { dataField: 'isMain', caption: 'Основной контакт', allowEditing: true, dataType: 'boolean' },
    { dataField: 'counterparty', allowEditing: true, caption: 'Контрагент' },
    { dataField: 'counterparty.id', allowEditing: true, caption: 'ID контрагента', dataType: 'number' },
    { dataField: 'counterparty.counterpartyFormatId', allowEditing: false, caption: 'ID формата контрагента', dataType: 'string' },
    { dataField: 'counterparty.name', allowEditing: false, caption: 'Имя контрагента', dataType: 'string' },
    { dataField: 'counterparty.inn', allowEditing: false, caption: 'ИНН контрагента', dataType: 'string' },
    { dataField: 'counterparty.isWithOutNDS', allowEditing: false, caption: 'Продается без учета НДС', dataType: 'boolean' },
    { dataField: 'counterparty.isCustomer', allowEditing: false, caption: 'Заказчик', dataType: 'boolean' },
    { dataField: 'counterparty.customerClassificationId', allowEditing: false, caption: 'ID номер клиента', dataType: 'number' },
    { dataField: 'counterparty.isSubcontractor', allowEditing: false, caption: 'Субподрядчик', dataType: 'boolean' },
    { dataField: 'counterparty.isProvider', allowEditing: false, caption: 'Поставщик', dataType: 'boolean' },
    { dataField: 'counterparty.counterpartyStatusId', allowEditing: false, caption: 'ID статуса контрагента', dataType: 'number' },
    { dataField: 'counterparty.note', allowEditing: false, caption: 'Примечание контрагента', dataType: 'string' },
];
