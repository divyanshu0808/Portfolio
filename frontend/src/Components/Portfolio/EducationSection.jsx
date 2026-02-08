import { GraduationCap } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import TimelineItem from './TimelineItem';
import '../../CSS/Portfolio/EducationSection.css';

const EducationSection = ({ education }) => {
    const [sectionRef, isVisible] = useScrollAnimation(0.1);

    const formatDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();

        const startStr = start.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
        const endStr = endDate ?
            end.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short'
            }) :
            'Present';

        return `${startStr} - ${endStr}`;
    };
    return (
        <section id="education" ref={sectionRef} className="education-section">
            <div className="education-container">
                <div className={`education-header ${isVisible ? 'animate-in' : ''}`}>
                    <div className="education-title">
                        <GraduationCap className="education-icon" />
                        <h2>Education</h2>
                    </div>
                    <p className="education-subtitle">My academic background</p>
                </div>

                <div className="education-timeline">
                    {education && education.map((edu, index) => (
                        <TimelineItem
                            key={index}
                            title={edu.degree}
                            subtitle={`${edu.institute} • ${edu.marks}`}
                            period={`${formatDuration(edu.startDate, edu.endDate)}`}
                            isLast={index === education.length - 1}
                            isVisible={isVisible}
                            delay={index * 0.2}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationSection;