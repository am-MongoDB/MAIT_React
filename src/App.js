import { useState, createContext, useEffect } from 'react';
import PickRole from './components/PickRole';
import Host from './components/Host';
import Participant from './components/Participant';
import Footer from './components/Footer';
import './css/App.css';

// Used for values that can be read/set from any component
export const UserContext = createContext(null);

function App() {
  const [role, setRole] = useState('tbd');
  const [debug, setDebug] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    console.log('Checking for session');
    const params = new URLSearchParams(window.location.search);
    const sessionParam = params.get('session');

    if (sessionParam) {
      console.log(`session = ${sessionParam}`);
      setRole('participant');
      setSession(sessionParam);
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider 
          value={{
            role: role, 
            setRole: setRole, 
            debug: debug,
            setDebug: setDebug
          }}
      >
        {role === 'tbd' && <h1>Welcome to the MongoDB Audience Interaction Tool (MAIT)</h1>}
        {role === 'tbd' && <PickRole />}
        {role === 'host' && <Host />}
        {role === 'participant' && <Participant sessionId={session} />}
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;