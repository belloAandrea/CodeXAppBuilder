
class CodexAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = '/codex';
    }

    async query(queryText) {
        const response = await fetch(`${this.baseUrl}/query`, {
            method: 'POST',
            headers: {
                'x-api-key': this.apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: queryText })
        });
        const data = await response.json();
        return data.aiResponse;
    }
}

export default CodexAPI;
