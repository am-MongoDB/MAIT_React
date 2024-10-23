import DigitalCounter from "./counters/DigitalCounter";

export default function AnswerButton({ 
  optionNumber,
  optionText,
  optionPicked,
  responseCount,
  setOptionPicked,
  correctOption
}) { 
  function pickMe() {
      if (!optionPicked) { setOptionPicked(optionNumber); }
  }
  
  return (
    <div className={`answer-button ${correctOption === null ? "" : optionNumber === correctOption ? "correct" : "incorrect"}`}>
      <button 
        type="submit" 
        className={`btn btn-primary btn-primary-branded btn-role ${optionPicked && optionPicked === optionNumber ? "selected-option" : ""} ${optionPicked && optionPicked !== optionNumber ? "discarded-option" : ""}`}
        onClick={pickMe}
        >
        {optionText}
      </button>
      <DigitalCounter count={responseCount}/>
    </div>
  );
}