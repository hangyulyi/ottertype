"use client"

import React, { useState, useEffect, useRef } from 'react';

import TextDisplay from './TextDisplay';

interface TypingAreaProps {
    targetText: string;
}

const TypingArea: React.FC<TypingAreaProps> = ({ targetText }) => {
    const [userInput, setUserInput] = useState('');
    const [timer, setTimer] = useState(30);
    const [isActive, setIsActive] = useState(false);
    const [showCursor, setShowCursor] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

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
    }

    return (
        <div className='px-8'>
            <div>
                <div className='text-2xl text-main-color'>{timer}</div>
                <TextDisplay targetText={targetText} userInput={userInput} />
            </div>
            <div 
                ref={inputRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
            />
            {timer === 0 && (
                <div>time over</div>
            )}
        </div>
    )

}

export default TypingArea;