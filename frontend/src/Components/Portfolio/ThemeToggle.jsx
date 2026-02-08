import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import '../../CSS/Portfolio/ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle-standalone"
            aria-label="Toggle theme"
        >
            <div className="theme-toggle-inner">
                <div className={`theme-icon ${theme === 'light' ? 'active' : ''}`}>
                    <Sun size={20} />
                </div>
                <div className={`theme-icon ${theme === 'dark' ? 'active' : ''}`}>
                    <Moon size={20} />
                </div>
            </div>
        </button>
    );
};

export default ThemeToggle;
