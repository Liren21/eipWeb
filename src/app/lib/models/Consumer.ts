import {Global, IGlobal} from "../../../core/lib/models/global";

export interface IConsumer extends IGlobal  {
    name: string
    consumerClassification: string;
}

export class Consumer extends Global<IConsumer, Consumer> implements IConsumer {
    name: string
    consumerClassification: string;


    constructor(obj: IConsumer) {
        super(obj)
    }
}
