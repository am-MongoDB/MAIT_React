import { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AnswerButton from './AnswerButton';

export default function AnswerButtonList({ 
    sessionId,
    cardType,
    options,
    responseCounts 
}) {
    const [selectedOptions, setSelectedOptions] = 
        useState(cardType === "PickOne" ? null : []);

    function optionSelected(option) {
        if (cardType === "PickOne") {
            setSelectedOptions(option)
        } else {
            setSelectedOptions(prevOptions => [...prevOptions, option]);
        }
    // TODO: Send response to BE
    }

    return (
        <div className='responsive-grid'>
            {options.map((optionText, index) => (
                <AnswerButton
                    key={index + 1}
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