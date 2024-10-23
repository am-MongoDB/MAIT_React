import { useState, createContext } from 'react';
import PickRole from './components/PickRole';
import Host from './components/Host';
import Footer from './components/Footer';
import './css/App.css';

// Used for values that can be read/set from any component
export const UserContext = createContext(null);

function App() {
  const [role, setRole] = useState('tbd');
  const [debug, setDebug] = useState(false);

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
        {role === 'tbd' && <PickRole/>}
        {role === 'host' && <Host/>}
        <Footer/>
      </UserContext.Provider>
    </div>
  );
}

export default App;