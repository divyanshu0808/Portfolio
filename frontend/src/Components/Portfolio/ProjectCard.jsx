import '../../CSS/Portfolio/ProjectCard.css';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ title, description, image, technologies, githubUrl, liveUrl }) => {
  return (
    <div className="project-card">
      <div className="project-image-container">
        <img
          src={image || "https://via.placeholder.com/500x400?text=Project+Image"}
          alt={title}
          className="project-image"
        />
        <div className="project-image-overlay"></div>
      </div>

      <div className="project-details">
        <h3 className="project-title">{title}</h3>
        <ul className="project-description">
          {description.map((desc, index) => (
            <li key={index} className="project-description-item">
              <span className="bullet-point"></span>
              {desc}
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="project-technologies">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="project-links">
          {githubUrl ? <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link github-link"
          >
            <Github className="link-icon" />
            <span>Code</span>
          </a> : ""}

          {liveUrl ? <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link demo-link"
          >
            <ExternalLink className="link-icon" />
            <span>Live Demo</span>
          </a> : ""}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard