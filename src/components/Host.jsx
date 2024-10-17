import React, { useState } from 'react';

export default function Host() {
    const [template, setTemplate] = useState('Example Vote'); // default selected option

    function startSession(template) {
        console.log(`Opening session using "${template}" template`);
    }

    return (
        <div className="host">
            <h1>Welcome MAIT host</h1>
            <h3>Select a template, and then start a new session.</h3>
            <div>
                <select 
                    className="branded-dropdown" 
                    value={template} 
                    onChange={(e) => setTemplate(e.target.value)}
                >
                    <option value="Example Vote">Example Vote</option>
                    <option value="Example Quiz">Example Quiz</option>
                    <option value="Example Survey">Example Survey</option>
                </select>
            </div>
            <button 
                type="submit" 
                className="btn btn-primary btn-primary-branded btn-role"
                onClick={() => startSession(template)}
            >
                Start session
            </button>
        </div>
    );
}