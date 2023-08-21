import {Global, IGlobal} from "../../../../core/lib/models/global";

export interface IType extends IGlobal  {
    name: string
    sortIndex: number
    groupLetter: string
    isBasic: boolean
}

export class Type extends Global<IType, Type> implements IType {
    name: string
    sortIndex: number
    groupLetter: string
    isBasic: boolean

    constructor(obj: IType) {
        super(obj)
    }
}
