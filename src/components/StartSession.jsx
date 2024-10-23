import { useState, useEffect } from 'react';
import { config } from '../config';

export default function StartSession({ template, setSession }) {
    const [error, setError] = useState(null);

    useEffect(() => {
        const startSession = async () => {
            try {
                const response = await fetch(`${config.hostURL}/session/${template}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include' // Ensure cookies are sent/received
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                window.localStorage.setItem(`${data.sessionId}_host`, new Date());
                setSession(data.sessionId);
            } catch (err) {
                setError(err.message);
            }
        };
        if (template) {
            startSession();
        }
    }, [template, setSession]);

    return (
        <div>
            <h1>Starting session...</h1>
            {error && <p className="error">{error}</p>}
        </div>
    );
}