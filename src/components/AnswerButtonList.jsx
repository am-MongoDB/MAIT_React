import { useState } from 'react';
// import { useContext } from 'react';
// import { UserContext } from '../../App';
import AnswerButton from './AnswerButton';

export default function AnswerButtonList({ 
    sessionId,
    cardType,
    options,
    responseCounts 
}) {
    // const { role } = useContext(UserContext);

    const [selectedOptions, setSelectedOptions] = 
        useState(cardType === "PickOne" ? null : []);

    function optionSelected(option) {
    // TODO: Enable once participant logic has been added
    // if (role === 'participant') {
        if (cardType === "PickOne") {
            setSelectedOptions(option)
        } else {
            setSelectedOptions(prevOptions => [...prevOptions, option]);
        }
    // TODO: Send response to BE
    // }

    }

    return (
        <div className='responsive-grid'>
            {options.map((optionText, index) => (
                <AnswerButton
                    // Not just using key=index so that the component doesn't
                    // get reused between sessions
                    key={`${sessionId}-${index}`}
                    optionNumber={index + 1}  
                    optionText={optionText}
                    optionPicked={selectedOptions}
                    responseCount={responseCounts && 
                        responseCounts.length > index ?
                        responseCounts[index] : null}
                    setOptionPicked={optionSelected}
                />
            ))}
        </div>
    );
}