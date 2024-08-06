"use client"

import React, { useState, useEffect, useRef } from 'react';

import TextDisplay from './TextDisplay';

interface TypingAreaProps {
}

const TypingArea: React.FC<TypingAreaProps> = ({ }) => {
    const [userInput, setUserInput] = useState('');
    const [lines, setLines] = useState<string[]>([]);
    const [words, setWords] = useState<string[]>([]);
    const [timer, setTimer] = useState(30);
    const [isActive, setIsActive] = useState(false);
    const [showCursor, setShowCursor] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const MAX_CHARS = 64;

    // fetch words
    useEffect(() => {
        fetch('/data/5000-words.txt')
            .then((response) => response.text())
            .then((data) => {
                const wordsArray = data.split('\n').filter(word => word.trim() !== '')
                setWords(wordsArray);
                setLines(generateRandomLines(wordsArray, 3, MAX_CHARS))
            })
            .catch((error) => console.error('Error fetching words', error));
    }, [])

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive) {
            interval = setInterval(() => {
                setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        } else if (!isActive && timer !== 30){
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [isActive, timer])

    // cursor effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500)
        return () => clearInterval(cursorInterval)
    }, [])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isActive) {
            setIsActive(true);
        }
        if (e.key === 'Backspace') {
            setUserInput((prev) => prev.slice(0, -1));
        } else if (e.key.length === 1) {
            setUserInput((prev) => prev + e.key);
        }

        // update lines if user hit the end of the line
        if (userInput + e.key === lines[0] + ' ') {
            setUserInput('');
            setLines((prevLines) => [
                ...prevLines.slice(1),
                generateRandomLine(words, MAX_CHARS)
            ])
        }
    }

    const handleClick = () => {
        inputRef.current?.focus()
    }

    return (
        <div className='px-8' onClick={handleClick}>
            <div>
                <div className='text-2xl text-main-color'>{timer}</div>
                {lines.map((line, index) => (
                    <TextDisplay key={index} targetText={line} userInput={index === 0 ? userInput : ''} />
                ))}
                <input 
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={() => {}}
                    onKeyDown={handleKeyDown}
                    className='absolute opacity-0'
                    style={{ outline: 'none' }}
                />
                {timer === 0 && (
                    <div>time over</div>
                )}
            </div>
        </div>
    )

}

const generateRandomLine = (words: string[], maxChars: number): string => {
    let line = ''
    while (true) {
        const randomWord = words[Math.floor(Math.random() * words.length)]

        // check word character length
        if ((line + randomWord).length <= maxChars) {
            line += `${randomWord} `
        } else {
            break;
        }
    }
    return line.trim()
}

const generateRandomLines = (words: string[], numLines: number, maxChars: number): string[] => {
    const lines = [];
    for (let i = 0; i < numLines; i++) {
        lines.push(generateRandomLine(words, maxChars))
    }
    return lines;
}

export default TypingArea;