import {Global, IGlobal} from "../../../../core/lib/models/global";

export interface ITest extends IGlobal  {
    title: string
    body: string
}

export class Test extends Global<ITest, Test> implements ITest {
    title: string
    body: string


    constructor(obj: ITest) {
        super(obj)
    }
}
