import { Target } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import '../../CSS/Portfolio/ObjectiveSection.css';

const ObjectiveSection = ({ objective }) => {
  const [sectionRef, isVisible] = useScrollAnimation(0.2);

  return (
    <section id="objective" ref={sectionRef} className="objective-section">
      <div className="objective-container">
        <div className={`objective-header ${isVisible ? 'animate-in' : ''}`}>
          <div className="objective-title">
            <Target className="objective-icon" />
            <h2>Career Objective</h2>
          </div>
        </div>

        <div className={`objective-content ${isVisible ? 'animate-in' : ''}`}>
          <p className="objective-text">
            {objective}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ObjectiveSection;