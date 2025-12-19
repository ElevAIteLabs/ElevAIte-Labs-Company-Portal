import { Link } from 'react-router-dom';
import { FiGrid, FiPlus } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = () => {
      try {
        const savedProjects = localStorage.getItem('projects');
        const defaultProjects = [
          {
            id: 'chaitanyamrutha',
            title: 'Chaitanyamrutha-Community Empowerment Platform',
            description: 'A website promoting a lifestyle of simplicity and mindful growth through initiatives like organic farming, animal welfare, education, healthcare, and food for life.',
            website: 'https://chaitanyamrutha.org/'
          },
          {
            id: 'beesuitz',
            title: 'Bee Suitz',
            description: 'Comprehensive AI enablement platform designed to unify education and execution with expert-tested prompts and a vetted directory of AI tools.',
            website: 'https://beesuitz.com/'
          },
          {
            id: 'portfolio',
            title: 'Professional Portfolio Website',
            description: 'Built a professional portfolio website to showcase skills, projects, and experience, enhancing online presence.',
            website: 'https://premsaikilaru-portfolio.netlify.app/'
          },
          {
            id: 'automated_email_reply',
            title: 'Automated Email Reply System',
            description: 'AI-powered Email Response Agent that automates client replies in real-time, streamlining business communication.',
            website: '#'
          },
          {
            id: 'lead_coordinator',
            title: 'AI-Powered Lead Coordinator',
            description: 'Automates handling and managing inquiries from potential tenants and pre-qualifies leads by analyzing their needs.',
            website: '#'
          },
          {
            id: 'content_generation',
            title: 'Content Generation Platform',
            description: 'AI-powered content creation tool for social media, blogs, and marketing materials.',
            website: '#'
          }
        ];

        if (savedProjects) {
          const parsedProjects = JSON.parse(savedProjects);
          // Merge with default projects, avoiding duplicates
          const mergedProjects = [...defaultProjects];
          parsedProjects.forEach(project => {
            if (!mergedProjects.some(p => p.id === project.id)) {
              mergedProjects.push(project);
            }
          });
          setProjects(mergedProjects);
        } else {
          setProjects(defaultProjects);
        }
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const totalProjects = projects.length;
  const newProjects = projects.filter(project => {
    // Consider projects added in the last 7 days as "new"
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return project.createdAt ? new Date(project.createdAt) > oneWeekAgo : false;
  }).length;

  const stats = [
    { title: 'Total Projects', value: totalProjects.toString(), icon: <FiGrid size={24} />, link: '/admin/projects' },
    { title: 'New Projects', value: newProjects.toString(), icon: <FiPlus size={24} />, link: '/admin/projects' },
  ];

  if (isLoading) {
    return <div className="admin-dashboard"><h1>Loading...</h1></div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Dashboard</h1>
      
      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <Link to={stat.link} key={index} className="stat-card">
            <div className="stat-icon">
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="projects-overview">
        <div className="section-header">
          <h2>All Projects ({totalProjects})</h2>
          <Link to="/admin/projects/new" className="btn btn-primary">
            <FiPlus /> Add New Project
          </Link>
        </div>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p className="project-description">
                {project.description.length > 100 
                  ? `${project.description.substring(0, 100)}...` 
                  : project.description}
              </p>
              <div className="project-actions">
                <a 
                  href={project.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                >
                  View Live
                </a>
                <Link 
                  to={`/admin/projects/edit/${project.id}`}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
