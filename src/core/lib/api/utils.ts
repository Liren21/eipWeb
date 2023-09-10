export async function sendRequest(url, method = 'GET', data: any = {}) {
    // const params = Object.keys(data)
    //     .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    //     .join('&');

    const result = await fetch(url, {
        body: data.values,
        method,
        headers:
            method === 'GET'
                ? {}
                : {
                    'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true'
                },
        // credentials: 'include',
    });

    if (result.ok) {
        const text = await result.text();

        return text && JSON.parse(text);
    }
    const json = await result.json();

    throw json.Message;
}
