import { useState, createContext } from 'react';
import PickRole from './components/PickRole';
import Host from './components/Host';
import './css/App.css';

// Used for controlling host vs. participant role
export const UserContext = createContext(null);

function App() {
  const [role, setRole] = useState('tbd');

  return (
    <div className="App">
      <UserContext.Provider 
          value={
            { role: role, setRole: setRole }
      }>
        {role === 'tbd' && <h1>Welcome to the MongoDB Audience Interaction Tool (MAIT)</h1>}
        {role === 'tbd' && <PickRole setRole={setRole}/>}
        {role === 'host' && <Host/>}
      </UserContext.Provider>
    </div>
  );
}

export default App;
