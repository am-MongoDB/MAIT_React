import React, { useState } from 'react';
import RegisterParticipant from './RegisterParticipant';
import Session from './Session';

export default function Participant({sessionId}) {
  const [session, setSession] = useState(sessionId);
  const [name, setName] = useState(null);

  return (
    <div className="participant">
      {!name && <div>
          <h1>Welcome MAIT Participant</h1>
          <RegisterParticipant 
            session={session}
            setName={setName}
            setSessionId={setSession}/>
      </div>}
      {session && name && <Session 
        session={session}/>}
    </div>
  );
}