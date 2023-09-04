import {Global, IGlobal} from "../../../core/lib/models/global";

export interface IEmployee extends IGlobal  {
    id: number;
    lastName: string;
    firstName: string;
    patronymicName: string;
    departmentId: number;
    positionId: number;
}

export class Employee extends Global<IEmployee, Employee> implements IEmployee {
    id: number;
    lastName: string;
    firstName: string;
    patronymicName: string;
    departmentId: number;
    positionId: number;


    constructor(obj: IEmployee) {
        super(obj)
    }
}
