import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState, useEffect } from 'react';
import { config } from '../config';
import InfoBar from './InfoBar';
import AnswerButtonList from './AnswerButtonList';

export default function SessionStarted({ session }) {
    const [error, setError] = useState(null);
    const [sessionData, setSessionData] = useState(null);
    const [latestEvent, setLatestEvent] = useState(null);
    const [joining, setJoining] = useState(false);
    const participantURL = `${window.location.origin}${window.location.pathname}?session=${session}`;
    const [responseCountsArray, setResponseCountsArray] = 
        useState(null);

    function convertObjectToArray(obj, count) {
        let result = [];
        for (let i = 1; i <= count; i++) {
            result.push(obj[i] || 0);
        }
        return result;
    }

    useEffect(() => {
        if (sessionData && sessionData.responseCounts && sessionData.options) {
            const newCountsData = convertObjectToArray(
                sessionData.responseCounts, sessionData.options.length);
            setResponseCountsArray(newCountsData);
        }
    }, [sessionData]);

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
                    setLatestEvent(eventData);
                    setSessionData((prevSessionData) => ({
                        ...prevSessionData,
                        ...eventData
                    }));
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
            {!joining && (
                <div>
                    <h1>Session started: {participantURL}</h1>
                    <button 
                        type="submit" 
                        className="btn btn-primary-branded btn-role"
                        onClick={joinSession}
                    >
                        Join session
                    </button>
                </div>
            )}
            {sessionData && (
                <div>
                    <h1>{sessionData.title}</h1>
                    <h2>{sessionData.text}</h2>
                    <InfoBar message={participantURL}/>
                    <AnswerButtonList 
                        sessionId={session}
                        cardType={sessionData.cardType}
                        options={sessionData.options}
                        responseCounts={responseCountsArray}
                    />
                    <div className="formatted-session-data">
                        <h4>Current state</h4>
                        <SyntaxHighlighter language="json" style={docco}>
                            {JSON.stringify(sessionData, null, 2)} 
                        </SyntaxHighlighter>
                        <h4>Latest event</h4>
                        <SyntaxHighlighter language="json" style={docco}>
                            {JSON.stringify(latestEvent, null, 2)} 
                        </SyntaxHighlighter>
                    </div>
                </div>  
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
}