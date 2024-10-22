export default function AnswerButton({ 
    optionNumber, // The number of this option amongst the available options
    optionText,   // The text associated with this option
    // allowMultipleSelections,// TODO: support multi-selection quiz
    optionPicked, // The number of the option that the user has selected.
                  // Should benull when no options have been selected yet.
    responseCount,
    setOptionPicked // Function for this component to update the parent's state
                    // with the number of the selected option (this one) 
}) {
    function pickMe() {
        if (!optionPicked) {
            setOptionPicked(optionNumber);
        }
    }

    return (
        <div className="answer-button">
            <button 
                type="submit" 
                className={`btn btn-primary btn-primary-branded btn-role ${optionPicked && optionPicked === optionNumber ? "selected-option" : ""} ${optionPicked && optionPicked !== optionNumber ? "discarded-option" : ""}`}
                onClick={pickMe}
            >
                {optionText}
            </button>
            <div className="response-count">
                {responseCount}
            </div>
        </div>
    );
}