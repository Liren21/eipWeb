import {Global, IGlobal} from "../../../../core/lib/models/global";
import {DepartmentCreatedByEmployee} from "./DepartmentCreatedByEmployee";

export interface ICreatedByEmployee extends IGlobal  {
    id: number;
    lastName: string;
    firstName: string;
    patronymicName: string;
    departmentId: number;
    positionId: number;
    department?: DepartmentCreatedByEmployee;
}

export class CreatedByEmployee extends Global<ICreatedByEmployee, CreatedByEmployee> implements ICreatedByEmployee {
    id: number;
    lastName: string;
    firstName: string;
    patronymicName: string;
    departmentId: number;
    positionId: number;
    department?: DepartmentCreatedByEmployee;


    constructor(obj: ICreatedByEmployee) {
        super(obj)
        this.department = obj.department? new DepartmentCreatedByEmployee(obj.department): obj.department
    }
}
