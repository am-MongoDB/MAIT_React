import { useState } from 'react';
import { config } from '../config';

export default function SessionStarted({ session }) {
    const [error, setError] = useState(null);
    const [sessionData, setSessionData] = useState(null);
    const [joining, setJoining] = useState(false);
    const participantURL = `${window.location.origin}${window.location.pathname}?session=${session}`;
    
    async function joinSession() {
        setJoining(true);
        try {
            const eventSource = new EventSource(
                `${config.hostURL}/session/${session}/events`, 
                { withCredentials: true }
            );
            eventSource.onmessage = (event) => {
                if (event.data) {
                    const eventData = JSON.parse(event.data);
                    setSessionData(eventData);
                } else {
                    throw new Error("Error: received event contains no 'data' field");
                }
              };
        } catch (err) {
            setError(err.message);
        }
    }
    
    return (
        <div>
            {!joining && <div>
                <h1>Session started: {participantURL}</h1>
                <button 
                type="submit" 
                className="btn btn-primary-branded btn-role"
                onClick={joinSession}
                >
                    Join session
                </button>
            </div>}
            {sessionData && <pre>{JSON.stringify(sessionData)}</pre>}
            {error && <p className="error">{error}</p>}
        </div>
    );
}