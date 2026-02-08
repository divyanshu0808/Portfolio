import { Briefcase } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import TimelineItem from './TimelineItem.jsx';
import '../../CSS/Portfolio/ExperienceSection.css';

const ExperienceSection = ({ experiences }) => {
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
    <section id="experience" ref={sectionRef} className={`experience-section ${experiences.length !== 0 ? '' : 'hidden'}`}>
      <div className="experience-container">
        <div className={`experience-header ${isVisible ? 'animate-in' : ''}`}>
          <div className="experience-title">
            <Briefcase className="experience-icon" />
            <h2>Experience</h2>
          </div>
          <p className="experience-subtitle">My professional journey</p>
        </div>

        <div className="experience-timeline">
          {experiences && experiences.map((exp, index) => exp && (
            <TimelineItem
              key={index}
              title={exp.role}
              subtitle={exp.company}
              period={`${formatDuration(exp.startDate, exp.endDate)}`}
              description={exp?.description}
              isLast={index === experiences.length - 1}
              isVisible={isVisible}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;