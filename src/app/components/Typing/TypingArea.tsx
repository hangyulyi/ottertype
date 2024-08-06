"use client"

import React, { useState, useEffect, useRef } from 'react';

import { GrPowerReset } from "react-icons/gr";

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
    const [correctChars, setCorrectChars] = useState(0)
    const [correctWords, setCorrectWords] = useState(0)
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

        // disable input when timer ends
        if (timer === 0) return;

        // esc key can also reset
        if (e.key === 'Escape') {
            reset()
            return;
        }
    }

    const handleClick = () => {
        inputRef.current?.focus()
    }

    const handleCountsChange = (correctChars: number, correctWords: number) => {
        setCorrectChars(correctChars)
        setCorrectWords(correctWords)
    }

    const calculateCPM = () => {
        return (correctChars);
    }

    const calculateWPM = () => {
        return (correctWords / 5) * 60
    }

    const reset = () => {
        setUserInput('')
        setTimer(30)
        setIsActive(false)
        setCorrectChars(0)
        setCorrectWords(0)
        if (words.length > 0) {
            setLines(generateRandomLines(words, 3, MAX_CHARS))
        }
    }

    return (
        <div className='px-8 flex flex-col items-center' onClick={handleClick}>
            <div className='text-left w-[1200px]'>
                <div className='text-2xl text-main-color'>{timer}</div>
                {lines.map((line, index) => (
                    <TextDisplay 
                        key={index} 
                        targetText={line} 
                        userInput={index === 0 ? userInput : ''} 
                        onCountsChange={handleCountsChange}
                    />
                ))}
                <input 
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={() => {}}
                    onKeyDown={handleKeyDown}
                    className='absolute opacity-0'
                    style={{ outline: 'none' }}
                    disabled={timer === 0}
                />

                {/* Correct CPM, WPM not correctly calculated */}
                {/* {timer === 0 && (
                    <div>CPM: {calculateCPM()} <br></br>
                        WPM: {calculateWPM()}
                    </div>
                )} */}

                
            </div>
            <div className='text-sub-color mt-4 py-10'>
                <GrPowerReset 
                    onClick={reset}
                    className='hover:text-text-color cursor-pointer'
                    size={22}
                />
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