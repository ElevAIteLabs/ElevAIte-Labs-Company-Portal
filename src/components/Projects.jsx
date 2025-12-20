import React, { useState, useEffect } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { FaMobileAlt, FaGlobe, FaRobot } from 'react-icons/fa';
import { getProjects } from '../data/projects';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Load projects from the shared data source
    setProjects(getProjects());
  }, []);

  // Function to get the appropriate icon for each tag
  const getTagIcon = (tag) => {
    if (tag.toLowerCase().includes('mobile')) return <FaMobileAlt />;
    if (tag.toLowerCase() === 'ai') return <FaRobot />;
    return <FaGlobe />;
  };

  // Function to get the appropriate class for each tag
  const getTagClass = (tag) => {
    if (tag.toLowerCase().includes('mobile')) return 'mobile';
    if (tag.toLowerCase() === 'ai') return 'ai';
    return 'web';
  };
  return (
    <div className="projects-page-container">
      <div className="projects-page-header">
        <h1>Our Projects</h1>
        <p>Check out some of our recent work</p>
      </div>
      
      <div className="projects-page-grid">
        {projects.map((project) => (
          <div key={project.id} className="projects-page-card">
            <div className="projects-page-image">
              {project.image ? (
                <img src={project.image} alt={project.title} />
              ) : (
                <div className="project-image-placeholder">
                  <FaGlobe size={48} opacity={0.3} />
                  <span>Preview not available</span>
                </div>
              )}
            </div>
            <div className="project-content">
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className={`tag ${getTagClass(tag)}`}>
                    {getTagIcon(tag)}
                    {tag}
                  </span>
                ))}
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-links">
                <a href={project.website} target="_blank" rel="noopener noreferrer" className={project.website === '#' ? 'disabled' : ''}>
                  <FiExternalLink /> {project.website === '#' ? 'View Project' : 'View Project'}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
