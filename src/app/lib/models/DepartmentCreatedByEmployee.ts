import {Global, IGlobal} from "../../../core/lib/models/global";

export interface IDepartmentCreatedByEmployee extends IGlobal  {
    name: string;
    sortIndex: number;
    isConsumer: boolean;
}

export class DepartmentCreatedByEmployee extends Global<IDepartmentCreatedByEmployee, DepartmentCreatedByEmployee> implements IDepartmentCreatedByEmployee {
    name: string;
    sortIndex: number;
    isConsumer: boolean;


    constructor(obj: IDepartmentCreatedByEmployee) {
        super(obj)
    }
}
