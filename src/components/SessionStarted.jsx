import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState, useContext } from 'react';
import { UserContext } from '../App';
import { config } from '../config';
import InfoBar from './InfoBar';
import AnswerButtonList from './AnswerButtonList';
import AdvanceButton from './AdvanceButton'
import FollowUp from './FollowUp';

export default function SessionStarted({ session }) {
    const { role, debug } = useContext(UserContext);
    const [error, setError] = useState(null);
    const [sessionData, setSessionData] = useState(null);
    const [latestEvent, setLatestEvent] = useState(null);
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
                        currentSlide={sessionData.currentSlide}
                        cardType={sessionData.cardType}
                        options={sessionData.options}
                        responseCounts={sessionData.responseCounts}
                        correctOption={sessionData.correctOption}
                    />
                    {sessionData.followUp && <FollowUp message={sessionData.followUp}/>}
                    {role === 'host' && <AdvanceButton sessionId={session}/>}
                    {debug && <div className="formatted-session-data">
                        <h4>Current state</h4>
                        <SyntaxHighlighter language="json" style={docco}>
                            {JSON.stringify(sessionData, null, 2)} 
                        </SyntaxHighlighter>
                        <h4>Latest event</h4>
                        <SyntaxHighlighter language="json" style={docco}>
                            {JSON.stringify(latestEvent, null, 2)} 
                        </SyntaxHighlighter>
                    </div>}
                </div>  
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
}