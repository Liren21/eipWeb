import {Global, IGlobal} from "../../../../core/lib/models/global";
import {DepartmentInvolvedByEmployee} from "./DepartmentInvolvedByEmployee";

export interface IInvolvedByEmployee extends IGlobal  {
    lastName: string;
    firstName: string;
    patronymicName: string;
    departmentId: number;
    positionId: number;
    department: DepartmentInvolvedByEmployee;
}

export class InvolvedByEmployee extends Global<IInvolvedByEmployee, InvolvedByEmployee> implements IInvolvedByEmployee {
    lastName: string;
    firstName: string;
    patronymicName: string;
    departmentId: number;
    positionId: number;
    department: DepartmentInvolvedByEmployee;


    constructor(obj: IInvolvedByEmployee) {
        super(obj)
        this.department = obj.department? new DepartmentInvolvedByEmployee(obj.department): obj.department
    }
}
