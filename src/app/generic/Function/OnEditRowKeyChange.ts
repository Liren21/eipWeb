import {setEditRowKey} from "../../../core/lib/api/actions";

export const OnEditRowKeyChange = (dispatch, editRowKey, setTitleMethod) => {
    setTitleMethod("Изменить")
    setEditRowKey(dispatch, editRowKey);
}
