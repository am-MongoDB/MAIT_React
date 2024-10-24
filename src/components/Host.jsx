import React, { useState } from 'react';
import StartSession from './StartSession';
import Session from './Session';

export default function Host() {
    const [template, setTemplate] = useState('Example Vote');
    const [session, setSession] = useState(null);

    return (
        <div className="host">
            {!session && <div>
                <h1>Welcome MAIT host</h1>
                <h3>Select a template, and then start a new session.</h3>
                <div>
                    <select 
                        className="branded-dropdown" 
                        value={template} 
                        onChange={(e) => setTemplate(e.target.value)}
                    >
                        {/* TODO: Should use a list from the database */}
                        <option value="Example Vote">Example Vote</option>
                        <option value="Example Quiz">Example Quiz</option>
                        <option value="Example Exam">Example Exam</option>
                        <option value="Example Survey">Example Survey</option>
                    </select>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary btn-primary-branded btn-role"
                    onClick={() => setSession('pending')}
                >
                    Start session
                </button>
            </div>}
            {session === "pending" && <StartSession
                // TODO: Remove this hack
                template = {template.replace(/ /g, '_').toUpperCase()}
                setSession= {setSession}
            />}
            {session && session !== "pending" && <Session 
                session={session}/>}
        </div>
    );
}