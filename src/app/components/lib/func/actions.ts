import {sendRequest} from './utils';

export const FETCH_PENDING = 'FETCH_PENDING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const SAVING_PENDING = 'SAVING_PENDING';
export const SAVING_SUCCESS = 'SAVING_SUCCESS';
export const SAVING_ERROR = 'SAVING_ERROR';
export const SAVING_CANCEL = 'SAVING_CANCEL';
export const SET_CHANGES = 'SET_CHANGES';
export const SET_EDIT_ROW_KEY = 'SET_EDIT_ROW_KEY';

export async function loadOrders(dispatch,URL) {
    dispatch({type: FETCH_PENDING});

    try {
        const data = await sendRequest(`${URL}/GetAll`);
        dispatch({
            type: FETCH_SUCCESS,
            payload: {
                data,
            },
        });
    } catch (err) {
        dispatch({type: FETCH_ERROR});
        throw err;
    }
}

export async function saveChange(dispatch, change,URL) {
    if (change && change.type) {
        let data;

        dispatch({type: SAVING_PENDING});

        try {
            data = await sendChange(URL, change);

            change.data = data;
            dispatch({
                type: SAVING_SUCCESS,
                payload: {
                    change,
                },
            });

            return data;
        } catch (err) {
            dispatch({type: SAVING_ERROR});
            throw err;
        }
    } else {
        dispatch({type: SAVING_CANCEL});
        return null;
    }
}

async function sendChange(url, change) {
    console.log(change)
    switch (change.type) {
        case 'insert':
            return sendRequest(`${url}`, 'POST', {
                values: JSON.stringify(change.data),
            });
        case 'update':
            return sendRequest(`${url}`, 'PATCH', {
                key: change.key,
                values: JSON.stringify({id: change.key, ...change.data}),
            });
        case 'remove':
            return sendRequest(`${url}/${change.key}`, 'DELETE', {key: change.key});
        default:
            return null;
    }
}

export function setChanges(dispatch, changes) {
    dispatch({
        type: SET_CHANGES,
        payload: changes,
    });
}

export function setEditRowKey(dispatch, editRowKey) {
    dispatch({
        type: SET_EDIT_ROW_KEY,
        payload: editRowKey,
    });
}
