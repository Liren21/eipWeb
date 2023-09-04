import {Global, IGlobal} from "../../../core/lib/models/global";
import {CreatedByEmployee} from "./CreatedByEmployee";
import {SignState} from "./SignState";
import {InvolvedByEmployee} from "./InvolvedByEmployee";
import {Consumer} from "./Consumer";
import {Type} from "./Type";

export interface IContract extends IGlobal  {
    created: string;
    createdByEmployeeId: number;
    createdByEmployee: CreatedByEmployee;
    signStateId: number;
    signState: SignState;
    involvedByEmployeeId: number;
    involvedByEmployee: InvolvedByEmployee;
    consumerId: number;
    consumer: Consumer;
    typeId: number;
    type: Type;
    number: string;
    agreementNumber: string;
    address: string;
    isValid: boolean;
}

export class Contract extends Global<IContract, Contract> implements IContract {
    created: string;
    createdByEmployeeId: number;
    createdByEmployee: CreatedByEmployee;
    signStateId: number;
    signState: SignState;
    involvedByEmployeeId: number;
    involvedByEmployee: InvolvedByEmployee;
    consumerId: number;
    consumer: Consumer;
    typeId: number;
    type: Type;
    number: string;
    agreementNumber: string;
    address: string;
    isValid: boolean;


    constructor(obj: IContract) {
        super(obj)
        this.createdByEmployee = obj.createdByEmployee? new CreatedByEmployee(obj.createdByEmployee): obj.createdByEmployee
        this.signState = obj.signState? new SignState(obj.signState): obj.signState
        this.involvedByEmployee = obj.involvedByEmployee? new InvolvedByEmployee(obj.involvedByEmployee): obj.involvedByEmployee
        this.consumer = obj.consumer? new Consumer(obj.consumer): obj.consumer
        this.type = obj.type? new Type(obj.type): obj.type
    }
}
