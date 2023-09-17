import {CounterpartyFormat} from "./CounterpartyFormat";
import {Classification} from "./Classification";
import {CounterpartyStatus} from "./CounterpartyStatus";
import {ProviderOrSubcontractorClassification} from "./ProviderOrSubcontractorClassification";

export interface ICounterparty {
    id: number;
    counterpartyFormatId: number;
    name: string;
    inn: string;
    isWithOutNDS: boolean;
    isCustomer: boolean;
    isSmallFormatInn?:boolean,
    sortIndex:number,
    customerClassificationId: number;
    isSubcontractor: boolean;
    isProvider: boolean;
    counterpartyStatusId: number;
    note: string;
    counterpartyFormat: CounterpartyFormat;
    customerClassification: Classification;
    counterpartyStatus: CounterpartyStatus;
    providerClassifications: ProviderOrSubcontractorClassification[];
    subcontractorClassifications: ProviderOrSubcontractorClassification[];
}
