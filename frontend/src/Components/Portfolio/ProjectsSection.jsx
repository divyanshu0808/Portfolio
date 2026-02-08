import React, { useState } from 'react';
import { FolderOpen, ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import '../../CSS/Portfolio/ProjectsSection.css';
import ProjectCard from './ProjectCard'

const ProjectsSection = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sectionRef, isVisible] = useScrollAnimation(0.1);

  const projectsData = projects.length > 0 ? projects : [];
  const totalProjects = projectsData.length;

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalProjects - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalProjects - 1 : prevIndex - 1
    );
  };
  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <div className="projects-container">
        {/* Header */}
        <div className={`projects-header ${isVisible ? 'animate-in' : ''}`}>
          <div className="projects-title">
            <FolderOpen className="projects-icon" />
            <h2>Projects</h2>
          </div>
          <p className="projects-subtitle">
            Some of my recent work showcasing different technologies and solutions
          </p>
        </div>

        {/* Carousel Container */}
        <div className="carousel-container">
          {/* Main Carousel */}
          <div className="carousel-wrapper">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projectsData.map((project, index) => (
                <div key={index} className="carousel-slide">
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    technologies={project.technologies}
                    githubUrl={project.githubUrl}
                    liveUrl={project.liveUrl}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="carousel-btn carousel-btn-prev"
            aria-label="Previous project"
          >
            <ChevronLeft className="carousel-btn-icon" />
          </button>

          <button
            onClick={goToNext}
            className="carousel-btn carousel-btn-next"
            aria-label="Next project"
          >
            <ChevronRight className="carousel-btn-icon" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="carousel-indicators">
          {projectsData.map((_, index) => (
            <div
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* Project Counter */}
        <div className="project-counter">
          <span>
            {currentIndex + 1} of {totalProjects}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;