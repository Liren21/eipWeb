import {Global, IGlobal} from "../../../core/lib/models/global";

export interface ISignState extends IGlobal  {
    name: string
}

export class SignState extends Global<ISignState, SignState> implements ISignState {
    name: string


    constructor(obj: ISignState) {
        super(obj)
    }
}
