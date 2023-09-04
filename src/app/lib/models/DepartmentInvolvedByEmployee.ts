import {Global, IGlobal} from "../../../core/lib/models/global";

export interface IDepartmentInvolvedByEmployee extends IGlobal  {
    parentId: number;
    name: string;
    sortName: string;
    sortIndex: number;
}

export class DepartmentInvolvedByEmployee extends Global<IDepartmentInvolvedByEmployee, DepartmentInvolvedByEmployee> implements IDepartmentInvolvedByEmployee {
    parentId: number;
    name: string;
    sortName: string;
    sortIndex: number;


    constructor(obj: IDepartmentInvolvedByEmployee) {
        super(obj)
    }
}
