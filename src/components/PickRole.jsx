import { useContext } from 'react';
import { UserContext } from '../App';

export default function PickRole() {
    const { setRole } = useContext(UserContext);

  return (
    <div className="intro-selection">
      <h3>Please select which role you're taking. Select <b>host</b> if you want to run your own session, or <b>participant</b> to join an existing session</h3>
      <button 
          type="submit" 
          className="btn btn-primary-branded btn-role"
          onClick={() => setRole('host')}
      >
          Host
      </button>
      <button 
          type="submit" 
          className="btn btn-primary-branded btn-role"
          onClick={() => setRole('participant')}
      >
          Participant
      </button>
    </div>
  )
}