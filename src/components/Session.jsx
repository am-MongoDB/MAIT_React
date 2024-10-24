import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../App';
import { config } from '../config';
import MarkDown from './Markdown/Markdown';
import InfoBar from './InfoBar';
import AnswerButtonList from './AnswerButtonList';
import AdvanceButton from './AdvanceButton'
import FollowUp from './FollowUp';
import Json from './Json';

export default function Session({ session }) {
    const { role, debug } = useContext(UserContext);
    const [error, setError] = useState(null);
    const [sessionData, setSessionData] = useState(null);
    const [latestEvent, setLatestEvent] = useState(null);
    const [joining, setJoining] = useState(false);
    const participantURL = `${window.location.origin}${window.location.pathname}?session=${session}`;

    useEffect(() => {
        console.log('Running');
        if (role === 'participant') {
            console.log('Joining session');
            joinSession();
        }
        // eslint-disable-next-line
      }, [role]);

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
            {!joining && role === 'host' && (
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
                <div id="session-content">
                    <h1>{sessionData.title}</h1>
                    <MarkDown markdown={sessionData.text}/>
                    {role === 'host' && <InfoBar message={participantURL}/>}
                    <AnswerButtonList 
                        sessionId={session}
                        currentSlide={sessionData.currentSlide}
                        cardType={sessionData.cardType}
                        options={sessionData.options}
                        responseCounts={sessionData.responseCounts}
                        correctOption={sessionData.correctOption}
                    />
                    {sessionData.followUp && <FollowUp message={sessionData.followUp}/>}
                    {role === 'host' && !sessionData.completed && 
                        <AdvanceButton sessionId={session}/>}
                    {debug && <div className="formatted-session-data">
                        <h4>Current state</h4>
                        <Json object={sessionData}/>
                        <h4>Latest event</h4>
                        <Json object={latestEvent}/>
                    </div>}
                </div>  
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
}