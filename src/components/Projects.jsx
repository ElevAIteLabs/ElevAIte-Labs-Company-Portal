import React, { useState, useEffect } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { FaMobileAlt, FaGlobe, FaRobot, FaLaptopCode, FaBrain, FaPenFancy } from 'react-icons/fa';
import { getProjects } from '../data/projects';
import '../styles/filters.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Load projects from the shared data source
    const loadProjects = () => {
      console.log('Loading projects...');
      
      // Check localStorage directly for debugging
      const storedProjects = localStorage.getItem('projects');
      console.log('Projects in localStorage:', storedProjects);
      
      const projectsData = getProjects();
      
      // Detailed debug logging
      console.group('Projects Data');
      console.log('Raw projects data from getProjects():', projectsData);
      console.log('Number of projects:', projectsData.length);
      projectsData.forEach((project, index) => {
        console.group(`Project ${index + 1}: ${project.title}`);
        console.log('ID:', project.id);
        console.log('Title:', project.title);
        console.log('Images:', project.images);
        console.log('Tags:', project.tags);
        console.log('Website:', project.website);
        console.groupEnd();
      });
      console.groupEnd();
      
      setProjects(projectsData);
    };
    
    loadProjects();
    
    // Add event listener for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'projects' || !e.key) {
        console.log('Storage change detected, reloading projects...');
        loadProjects();
      }
    };
    
    // Also log localStorage content for debugging
    const storedProjects = localStorage.getItem('projects');
    console.log('Raw localStorage projects:', storedProjects);
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refreshKey]);
  
  // Force refresh when component mounts or when refreshKey changes
  useEffect(() => {
    console.log('Refresh key changed, reloading projects...');
    const projectsData = getProjects();
    console.log('Refreshed projects data:', projectsData);
    setProjects(projectsData);
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
    if (activeFilter === 'all') {
      console.log('Showing all projects:', projectsArray.length);
      return [...projectsArray];
    }
    
    console.log(`Filtering projects by: ${activeFilter}`);
    return projectsArray.filter(project => {
      if (!project || !project.tags || !Array.isArray(project.tags)) {
        console.log('Project missing tags or invalid:', project);
        return false;
      }
      
      // For each project, check if any of its tags match the active filter
      const matches = project.tags.some(tag => {
        if (!tag) return false;
        const tagLower = tag.toString().toLowerCase().trim();
        const filterLower = activeFilter.toLowerCase().trim();
        
        // Special case for 'web' filter to match only 'Web App' tags
        if (filterLower === 'web' && tagLower === 'web app') {
          return true;
        }
        
        // Special case for 'ai' filter to match only 'AI Automation' tags
        if (filterLower === 'ai' && 
            (tagLower.includes('ai automation') || tagLower === 'automation')) {
          return true;
        }
        
        // Special case for 'agents' filter to match only 'AI Agents' tags
        if (filterLower === 'agents' && 
            (tagLower.includes('ai agent') || tagLower === 'agent')) {
          return true;
        }
        
        // Special case for 'mobile' filter
        if (filterLower === 'mobile' && tagLower.includes('mobile')) {
          return true;
        }
        
        // Special case for 'content' filter
        if (filterLower === 'content' && tagLower.includes('content')) {
          return true;
        }
        
        // Default matching
        return tagLower.includes(filterLower);
      });
      
      if (matches) {
        console.log(`Project matches filter "${activeFilter}":`, project.title, 'Tags:', project.tags);
      }
      
      return matches;
    });
  }, [projectsArray, activeFilter]);
  
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
          <h1>Our Projects</h1>
        <p>Check out some of our recent work</p>

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
