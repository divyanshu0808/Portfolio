import { Mail, Phone, Github, Linkedin, Code, MapPin, Download } from 'lucide-react';
import { useScrollAnimation, useParallax } from '../../hooks/useScrollAnimation.js';
import TypingEffect from './TypingEffect.jsx';
import '../../CSS/Portfolio/ProfileSection.css';

const ProfileSection = ({ data }) => {
  const [profileRef, isProfileVisible] = useScrollAnimation(0.2);
  const [imageRef, imageOffset] = useParallax(0.3);
  const [infoRef, infoOffset] = useParallax(-0.2);

  return (
    <section id="profile" className="profile-section">
      <div className="profile-container">
        <div className="profile-content">
          {/* Contact Information */}
          <div
            ref={infoRef}
            className={`profile-info ${isProfileVisible ? 'animate-in' : ''}`}
            style={{ transform: `translateY(${infoOffset}px)` }}
          >
            <h1 className="profile-name">
              {data.name}
            </h1>

            <TypingEffect
              texts={['Full Stack Web Developer', 'Android Developer', 'Full Stack Web Developer']}
              speed={100}
              deleteSpeed={50}
              pauseTime={2000}
            />

            <div className="contact-info">
              <a
                className="contact-item"
              >
                <MapPin />
                <span>{data.place}</span>
              </a>
              <a
                className="contact-item"
              >
                <Mail className="contact-icon" />
                <span>{data.email}</span>
              </a>

              <a
                className="contact-item"
              >
                <Phone className="contact-icon" />
                <span>{data.phone}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="social-links">
              <div className="tooltip-container">
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link github"
                >
                  <Github className="social-icon" />
                </a>
                <span className="tooltip">GitHub</span>
              </div>

              <div className="tooltip-container">
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link linkedin"
                >
                  <Linkedin className="social-icon" />
                </a>
                <span className="tooltip">LinkedIn</span>
              </div>

              <div className="tooltip-container">
                <a
                  href={data.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link leetcode"
                >
                  <Code className="social-icon" />
                </a>
                <span className="tooltip">LeetCode</span>
              </div>

              <div className="tooltip-container">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link resume"
                >
                  <Download />
                </a>
                <span className="tooltip">Download Resume</span>
              </div>
            </div>
          </div>
          <div
            ref={imageRef}
            className={`profile-image-container ${isProfileVisible ? 'animate-in' : ''}`}
            style={{ transform: `translateY(${imageOffset}px)` }}
          >
            <div className="profile-image-wrapper">
              {/* Outer rotating ring */}
              <div className="profile-ring profile-ring-1"></div>
              <div className="profile-ring profile-ring-2"></div>
              <div className="profile-ring profile-ring-3"></div>

              {/* Floating particles */}
              <div className="profile-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
                <div className="particle particle-4"></div>
                <div className="particle particle-5"></div>
                <div className="particle particle-6"></div>
              </div>

              {/* Main image with multiple effects */}
              <div className="profile-image-inner">
                <img
                  src={data.profileImage}
                  alt={data.name}
                  className="profile-image"
                />
                <div className="profile-image-overlay"></div>
                <div className="profile-image-glow"></div>
                <div className="profile-image-shine"></div>
              </div>

              {/* Interactive hover effects */}
              <div className="profile-hover-effects">
                <div className="hover-ring hover-ring-1"></div>
                <div className="hover-ring hover-ring-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;