import { useState, useContext } from 'react';
import { UserContext } from '../App';

export default function Footer() {
  const { debug, setDebug } = useContext(UserContext);
  const [checked, setChecked] = useState(debug);

  function handleChange() {
    setDebug(!checked);
    setChecked(!checked);
  }
     
  return (
    <div className="space-above" id="footer">
      <div className="footer">
        <label htmlFor="debug-checkbox">Debug</label>
        <input 
          type="checkbox" 
          className="checkbox"
          checked={checked}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}