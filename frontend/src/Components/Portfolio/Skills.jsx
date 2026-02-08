import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import '../../CSS/Portfolio/Skills.css'

export default function Skills({ skillsData }) {
    const [sectionRef, isVisible] = useScrollAnimation(0.1);

    return (
        <section id="skills" ref={sectionRef} className="skills-section">
            <div className={`skills-header ${isVisible ? 'animate-in' : ''}`}>
                <h2 className="skills-title">My Skills</h2>
                <p className="skills-subtitle">
                    Technologies and tools I work with to create amazing digital experiences
                </p>
            </div>

            <div className="skills-container">
                {Object.entries(skillsData).map(([index, skill]) => (
                    <div
                        key={index}
                        className={`skill-card ${isVisible ? 'animate-in' : ''}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="skill-icon-wrapper">
                            <i className={`${skill.icon} skill-icon`}></i>
                        </div>
                        <h4 className="skill-name">{skill.name}</h4>
                        <p className="skill-description">{skill.description}</p>
                        <div className="skill-glow"></div>
                    </div>
                ))}
            </div>
        </section>
    )
}