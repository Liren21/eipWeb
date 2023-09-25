import {setChanges} from "../../../core/lib/api/actions";


export const OnChangesChange = (dispatch, changes, setTitleMethod) => {
    setTitleMethod("Создать")
    setChanges(dispatch, changes);
}
