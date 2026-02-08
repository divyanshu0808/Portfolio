import { Award } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import CertificationCard from './CertificationCard.jsx';
import '../../CSS/Portfolio/CertificationsSection.css';

const CertificationsSection = ({ certifications }) => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="certifications" ref={sectionRef} className="certifications-section">
      <div className="certifications-container">
        <div className={`certifications-header ${isVisible ? 'animate-in' : ''}`}>
          <div className="certifications-title">
            <Award className="certifications-icon" />
            <h2>Certifications</h2>
          </div>
          <p className="certifications-subtitle">My professional achievements</p>
        </div>

        <div className="certifications-grid">
          {certifications.map((cert, index) => cert && (
            <CertificationCard
              key={index}
              name={cert?.name}
              image={cert?.image}
              platform={cert?.platform}
              skills={cert?.skills}
              link={cert?.link}
              isVisible={isVisible}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;