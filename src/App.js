import { useState } from 'react';
import PickRole from './components/PickRole';
import './css/App.css';

function App() {
  const [role, setRole] = useState('tbd');
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {role === 'tbd' && <h1>Welcome to the MongoDB Audience Interaction Tool (MAIT)</h1>}
      {/* </header> */}
        {role === 'tbd' && <PickRole setRole={setRole}/>}
    </div>
  );
}

export default App;
