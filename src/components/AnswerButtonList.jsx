import { useState, useContext, useEffect } from 'react';
import { config } from '../config';
import { UserContext } from '../App';
import AnswerButton from './AnswerButton';

export default function AnswerButtonList({ 
  sessionId,
  currentSlide,
  cardType,
  options,
  responseCounts,
  correctOption
}) {
  const { role } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [existingSlide, setExistingSlide] = useState(null);
  const [selectedOptions, setSelectedOptions] = 
    useState(cardType === "PickOne" ? null : []);

  useEffect(() => {
    if (currentSlide !== existingSlide || correctOption !== null) {
      setExistingSlide(currentSlide);
      setSelectedOptions(cardType === "PickOne" ? null : []);
    }
  }, [currentSlide, existingSlide, cardType, correctOption]);
  
  async function sendResponseSingeleOption(option) {
    try {
      const response = await fetch(`${config.hostURL}/session/${sessionId}/response`, 
        {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answer: option, slideNo: currentSlide }),
          credentials: 'include' // Ensure cookies are sent/received
      });
      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }
    } catch (err) {
        setError(err.message);
    }
  }

  async function optionSelected(option) {
    if (role === 'participant') {
      if (cardType === "PickOne") {
        setSelectedOptions(option)
        await sendResponseSingeleOption(option);
      } else {
        setSelectedOptions(prevOptions => [...prevOptions, option]);
        // TODO: Need to add a SEND button for multiple selections
      }
    }
  }
  
  return (
    <div className='responsive-grid avoiding-footnote'>
      {options.map((optionText, index) => (
        <AnswerButton
          // Not just using key=index so that the component doesn't
          // get reused between sessions
          key={`${sessionId}-${index}`}
          optionNumber={index}  
          optionText={optionText}
          optionPicked={selectedOptions}
          responseCount={responseCounts && 
            responseCounts.length > index ?
            responseCounts[index] : 0}
          setOptionPicked={optionSelected}
          correctOption={correctOption}
        />
      ))}
      {error && <p className="error">{error}</p>}
    </div>
  );
}