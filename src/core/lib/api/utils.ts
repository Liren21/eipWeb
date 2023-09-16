import axios from 'axios';


export async function sendRequest(url, method = 'GET', data = {}) {

    try {
        const axiosConfig = {
            method,
            url,
            headers: method === 'GET' ? {} : {
                'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
            },
            data: method === 'GET' ? undefined : data,
        };

        const response = await axios(axiosConfig);

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error(response.data.Message);
        }
    } catch (error) {
        throw error;
    }
}
