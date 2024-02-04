class RestClient {
    static post(url: string, message: string, username?: string) {
        console.log("start sendHttpPost")
        const payload = JSON.stringify({
            username,
            content: message || '_'
        });
        const method: 'post' = 'post';
        const options = {
            method,
            headers: { 'Content-type': "application/json" },
            payload,
        };
        console.log(`payload: ${payload}`)
        UrlFetchApp.fetch(url, options);
        console.log("end sendHttpPost")
    }
}
