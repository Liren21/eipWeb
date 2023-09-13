import {sendRequest} from './utils';
import axios from "axios";
import Toaster from "../toaster/toaster";
import {toast} from "react-toastify";

export const FETCH_PENDING = 'FETCH_PENDING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const SAVING_PENDING = 'SAVING_PENDING';
export const SAVING_SUCCESS = 'SAVING_SUCCESS';
export const SAVING_ERROR = 'SAVING_ERROR';
export const SAVING_CANCEL = 'SAVING_CANCEL';
export const SET_CHANGES = 'SET_CHANGES';
export const SET_EDIT_ROW_KEY = 'SET_EDIT_ROW_KEY';


export async function loadOrders(dispatch, URL, block = '/GetAll') {
    dispatch({type: FETCH_PENDING});

    try {
        const data = await sendRequest(`${URL + block}`, 'GET');
        dispatch({
            type: FETCH_SUCCESS,
            payload: {
                data,
            },
        });
    } catch (err) {
        dispatch({type: FETCH_ERROR});
        console.log(err)
        // throw err;
    }
}


export async function saveChange(dispatch, change, URL) {
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
            err.response.data.map((data) => (
                new Toaster({msg: `${data.errorMessage} поле ${data.propertyName}`, type: toast.TYPE.ERROR})
            ))
            // throw err;
        }
    } else {
        dispatch({type: SAVING_CANCEL});
        return null;
    }
}

async function sendChange(url, change) {
    try {
        switch (change.type) {
            case 'insert':
                const insertResponse = await axios.post(url, change.data, {
                    headers: {
                        'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
                    },
                });
                return insertResponse.data;

            case 'update':
                const updateResponse = await axios.patch(url, {...change.data, id: change.key}, {
                    headers: {
                        'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
                    },
                });
                return updateResponse.data;

            case 'remove':
                const removeResponse = await axios.delete(`${url}/${change.key}`, {
                    headers: {
                        'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
                    },
                });
                return removeResponse.data;

            default:
                return null;
        }
    } catch (error) {
        throw error;
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
