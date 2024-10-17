export default function SessionStarted({ session }) {
    const participantURL = `${window.location.origin}${window.location.pathname}?session=${session}`;
    return (
        <div>
            <h1>Session started: {participantURL}</h1>
        </div>
    );
}