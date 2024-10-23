import { useState } from 'react';
import { config } from '../config';

export default function AdvanceButton({ sessionId }) { 
  const [error, setError] = useState(null);

  async function advance() {
    try {
      const response = await fetch(`${config.hostURL}/session/${sessionId}/advance`, 
        {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include' // Ensure cookies are sent/received
      });
      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }
    } catch (err) {
        setError(err.message);
    }
  }
  
  return (
    <div className="answer-button">
      <button 
        type="submit" 
        className="btn btn-primary btn-primary-branded-control"
        onClick={advance}
        >
        {`Next →`}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}