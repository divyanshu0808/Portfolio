import { useState, useEffect } from 'react';
import '../../CSS/Portfolio/TypingEffect.css';

const TypingEffect = ({ texts, speed = 100, deleteSpeed = 50, pauseTime = 2000 }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isPaused) {
                setIsPaused(false);
                setIsDeleting(true);
                return;
            }

            const fullText = texts[currentTextIndex];

            if (isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length - 1));

                if (currentText === '') {
                    setIsDeleting(false);
                    setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
                }
            } else {
                setCurrentText(fullText.substring(0, currentText.length + 1));

                if (currentText === fullText) {
                    setIsPaused(true);
                }
            }
        }, isDeleting ? deleteSpeed : speed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, isPaused, currentTextIndex, texts, speed, deleteSpeed]);

    return (
        <div className="typing-effect">
            <span className="typing-text">{currentText}</span>
            <span className="typing-cursor">|</span>
        </div>
    );
};

export default TypingEffect;
