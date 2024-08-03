import React from 'react'

interface TextDisplayProps {
    targetText: string;
    userInput: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ targetText, userInput }) => {
    const renderText = () => {
        const inputLength = userInput.length;
        const correctInput = targetText.substring(0, inputLength);
        const remainingText = targetText.substring(inputLength)

        return (
            <>
                {correctInput.split('').map((char, index) => (
                    <span
                        key={index}
                        className={
                            userInput[index] === char ? 'text-text-color' : 'text-error-color'
                        }
                    >
                        {char}
                    </span>
                ))}
                <span className='text-sub-color'>{remainingText}</span>
            </>
        )
    }

    return (
        <div className='text-2xl'>
            {renderText()}
        </div>
    )
}

export default TextDisplay