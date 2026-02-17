export const askAi = async (query: string, history: { role: 'user' | 'model'; text: string }[] = []) => {
    const response = await fetch('http://localhost:3000/objective/ai/chat-bot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, history }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AI Request Failed: ${errorText}`);
    }

    return response.text();
};
