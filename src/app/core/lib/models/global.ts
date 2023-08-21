import {IInit, Init} from "./init";


export type IGlobal = IInit

export class Global<I, T> extends Init<I, T> implements IGlobal {
    constructor(obj: IGlobal) {
        super(obj)
    }

}
