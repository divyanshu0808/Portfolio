import { Award, ExternalLink} from 'lucide-react';
import '../../CSS/Portfolio/CertificationCard.css';

const CertificationCard = ({ name, image, platform, skills, link }) => {
  return (
    <div className="certification-card">
      <div className="certification-image-container">
        <img
          src={image}
          alt={name}
          className="certification-image"
        />
      </div>

      <div className="certification-content">
        <div className="certification-header">
          <Award className="certification-award-icon" />
          <h3 className="certification-name">{name}</h3>
        </div>

        <p className="certification-platform">{platform}</p>

        {/* Skills */}
        <div className="certification-skills">
          <h4 className="skills-titl">Skills Learned:</h4>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="skill-tag"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="project-links">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link demo-link"
            >
              <ExternalLink className="link-icon" />
              <span>See Details</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationCard;