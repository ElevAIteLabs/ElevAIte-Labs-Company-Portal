import React, { useState, useEffect } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { FaMobileAlt, FaGlobe, FaRobot, FaLaptopCode, FaBrain, FaPenFancy } from 'react-icons/fa';
import { getProjects, defaultProjects } from '../data/projects';
import { apiService } from '../services/api';
import '../styles/projects.css';


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const apiProjects = await apiService.getProjects();

        // Combine with defaults
        const projectMap = new Map();
        defaultProjects.forEach(p => projectMap.set(p.id, p));

        if (Array.isArray(apiProjects)) {
          apiProjects.forEach(p => {
            const normalized = {
              ...p,
              project_type: p.project_type || 'Web App',
              tags: [p.project_type || 'Web App']
            };
            projectMap.set(p.id, normalized);
          });
        }

        setProjects(Array.from(projectMap.values()));
      } catch (error) {
        console.error('Error loading projects from API:', error);
        setProjects(defaultProjects);
      }
    };

    loadProjects();
  }, [refreshKey]);

  const filterButtons = [
    { id: 'all', label: 'ALL', icon: null },
    { id: 'mobile', label: 'Mobile Apps', icon: <FaMobileAlt /> },
    { id: 'web', label: 'Web Apps', icon: <FaLaptopCode /> },
    { id: 'ai', label: 'AI Automation', icon: <FaRobot /> },
    { id: 'agents', label: 'AI Agents', icon: <FaBrain /> },
    { id: 'content', label: 'Content Creation', icon: <FaPenFancy /> }
  ];

  // Function to handle filter button click
  const handleFilterClick = (filterId) => {
    console.log(`Filter clicked: ${filterId}`);
    setActiveFilter(filterId);
  };

  console.log('Active filter:', activeFilter);
  // Log current state for debugging
  console.log('Current projects state:', projects);
  console.log('Active filter:', activeFilter);

  // Ensure projects is an array before filtering
  const projectsArray = Array.isArray(projects) ? projects : [];

  const filteredProjects = React.useMemo(() => {
    // First, ensure projects is an array
    const projectsArray = Array.isArray(projects) ? projects : [];

    if (!projectsArray.length) {
      console.warn('No projects available to filter');
      return [];
    }

    if (activeFilter === 'all') {
      console.log('Showing all projects:', projectsArray.length);
      return [...projectsArray];
    }

    console.log(`Filtering projects by: ${activeFilter}`);
    const lowerCaseFilter = activeFilter.toLowerCase().trim();

    return projectsArray.filter(project => {
      if (!project) {
        console.warn('Undefined project found in array');
        return false;
      }

      // Ensure project has tags and it's an array
      const projectTags = Array.isArray(project.tags) ? project.tags : [];

      // If no tags, only show in 'all' filter (already handled above)
      if (!projectTags.length) {
        return false;
      }

      // Check if any tag matches the filter
      return projectTags.some(tag => {
        if (!tag) return false;
        const tagLower = tag.toString().toLowerCase().trim();

        // Handle different filter cases
        switch (lowerCaseFilter) {
          case 'web':
            // Only match exact 'web app' or 'web' tags
            return tagLower === 'web app' || tagLower === 'web';

          case 'ai':
            // Match only AI Automation tags, exclude AI Agent
            return (tagLower === 'ai automation' || tagLower === 'automation') &&
              tagLower !== 'ai agent' && tagLower !== 'agent';

          case 'agents':
            // Match only AI Agent specific tags
            return tagLower === 'ai agent' || tagLower === 'agent';

          case 'mobile':
            // Only match mobile-specific tags (case-insensitive)
            return tagLower === 'mobile' || tagLower === 'mobile app' ||
              tagLower === 'mobile application';

          case 'content':
            // Match content-related tags
            return tagLower === 'content' || tagLower === 'content creation' ||
              tagLower === 'content generation' || tagLower === 'content creation';

          default:
            // Default to exact match for other filters
            return tagLower === lowerCaseFilter;
        }
      });
    });
  }, [projects, activeFilter]);

  console.log(`Found ${filteredProjects.length} projects matching filter "${activeFilter}":`,
    filteredProjects.map(p => p.title));

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
  // Add a refresh button for manual refresh if needed
  const handleRefresh = () => {
    console.log('Manual refresh triggered');
    // Clear any cached projects from localStorage
    localStorage.removeItem('projects');
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="projects-page-container projects-page">
      <div className="projects-page-header">

        <h1>AI, Web & Mobile Development</h1>
        <p>Explore our portfolio of AI automation systems, web applications, mobile apps, and intelligent software solutions built for impact.</p>
      </div>

      <div className="filters-container">
        {filterButtons.map(({ id, label, icon }) => {
          return (
            <button
              key={id}
              className={`filter-button ${activeFilter === id ? 'active' : ''}`}
              onClick={() => handleFilterClick(id)}
              title={`Show ${label}`}
            >
              {icon && <span className="filter-icon">{icon}</span>}
              {label}
            </button>
          );
        })}
      </div>

      <div className="projects-page-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="projects-page-card">
            <div className="projects-page-image">
              {project.image || (project.images && project.images[0]) ? (
                <img src={project.image || project.images[0]} alt={project.title} />
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
