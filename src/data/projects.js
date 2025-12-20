// Default projects data
export const defaultProjects = [
  {
    id: 'chaitanyamrutha',
    title: 'Chaitan yamrutha-Community Empowerment Platform',
    description: 'A website promoting a lifestyle of simplicity and mindful growth through initiatives like organic farming, animal welfare, education, healthcare, and food for life, built to inspire and serve communities worldwide.',
    images: ['/pictures/p1-2.png', '/pictures/p1.png', '/pictures/p1-3.png'],
    website: 'https://chaitanyamrutha.org/',
    tags: ['Web App']
  },
  {
    id: 'beesuitz',
    title: 'Bee Suitz',
    description: 'Designed and developed Bee Suitz, a comprehensive AI enablement platform designed to unify education and execution. The application features a library of expert-tested prompts and a vetted directory of AI tools.',
    images: ['/pictures/bee suitz-2.png', '/pictures/bee suitz-1.png', '/pictures/bee suitz-3.png'],
    website: 'https://beesuitz.com/',
    tags: ['Web App']
  },
  {
    id: 'portfolio',
    title: 'Professional Portfolio Website',
    description: 'Built a professional portfolio website to showcase skills, projects, and experience, enhancing online presence and attracting potential clients or employers.',
    images: ['/pictures/Professional Portfolio Website-2.png', '/pictures/Professional Portfolio Website-1.png', '/pictures/Professional Portfolio Website-3.png'],
    website: 'https://premsaikilaru-portfolio.netlify.app/',
    tags: ['Web App']
  },
  {
    id: 'automated_email_reply',
    title: 'Automated Email Reply System',
    description: 'AI-powered Email Response Agent that automates client replies in real-time, streamlining business communication with quick, accurate, and context-aware responses.',
    images: ['/pictures/automated email.png'],
    website: '#',
    tags: ['AI Agent']
  },
  {
    id: 'lead_coordinator',
    title: 'AI-Powered Lead Coordinator',
    description: 'AI-powered lead coordinator that automates the entire process of handling and managing inquiries from potential tenants. It pre-qualifies leads by analyzing their needs.',
    images: ['/pictures/lead coordinator.png'],
    website: '#',
    tags: ['Lead Management']
  },
  {
    id: 'content_generation',
    title: 'Content Generation Platform',
    description: 'AI-powered content creation tool for social media, blogs, and marketing materials.',
    images: ['/pictures/content creation.png'],
    website: '#',
    tags: ['Content']
  }
];

// Get projects from localStorage and combine with default projects
export const getProjects = () => {
  let combinedProjects = [...defaultProjects];
  
  try {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
        // Create a map of existing project IDs for quick lookup
        const existingIds = new Set(combinedProjects.map(p => p.id));
        
        // Only add saved projects that don't exist in default projects
        parsedProjects.forEach(project => {
          if (!existingIds.has(project.id)) {
            combinedProjects.push(project);
          }
        });
      }
    }
  } catch (error) {
    console.error('Error loading projects from localStorage:', error);
  }
  
  return combinedProjects;
};
