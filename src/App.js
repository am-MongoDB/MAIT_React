import { useState } from 'react';
import PickRole from './components/PickRole';
import Host from './components/Host';
import './css/App.css';

function App() {
  const [role, setRole] = useState('tbd');
  return (
    <div className="App">
        {role === 'tbd' && <h1>Welcome to the MongoDB Audience Interaction Tool (MAIT)</h1>}
        {role === 'tbd' && <PickRole setRole={setRole}/>}
        {role === 'host' && <Host/>}

    </div>
  );
}

export default App;
