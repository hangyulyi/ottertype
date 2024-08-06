import React, { useEffect } from 'react'

interface TextDisplayProps {
    targetText: string;
    userInput: string;
    onCountsChange: (correctChars: number, correctWords: number) => void;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ targetText, userInput, onCountsChange }) => {
    useEffect(() => {
        const correctChars = countCorrectChars(targetText, userInput);
        const correctWords = countCorrectWords(targetText, userInput);
        onCountsChange(correctChars, correctWords);
    }, [targetText, userInput])

    const countCorrectChars = (target: string, input: string) => {
        let count = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i] === target[i]){
                count++
            } else {
                break;
            }
        }
        return count;
    }

    const countCorrectWords = (target: string, input: string) => {
        const targetWords = target.split(' ');
        const inputWords = input.split(' ');
        let count = 0;
        for (let i = 0; i < inputWords.length; i++) {
            if (inputWords[i] === targetWords[i]) {
                count++
            } else {
                break
            }
        }
        return count;
    }
    
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
        <div className='text-3xl text-left leading-relaxed'>
            {renderText()}
        </div>
    )
}

export default TextDisplay