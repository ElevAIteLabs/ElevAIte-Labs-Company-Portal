// Default projects data
export const defaultProjects = [
  {
    id: 'chaitanyamrutha',
    title: 'Chaitan yamrutha-Community Empowerment Platform',
    description: 'A website promoting a lifestyle of simplicity and mindful growth through initiatives like organic farming, animal welfare, education, healthcare, and food for life, built to inspire and serve communities worldwide.',
    image: '/pictures/p1.png',
    website: 'https://chaitanyamrutha.org/',
    tags: ['Web App']
  },
  {
    id: 'beesuitz',
    title: 'Bee Suitz',
    description: 'Designed and developed Bee Suitz, a comprehensive AI enablement platform designed to unify education and execution. The application features a library of expert-tested prompts and a vetted directory of AI tools.',
    image: '/pictures/bee suitz-1.png',
    website: 'https://beesuitz.com/',
    tags: ['Web App']
  },
  {
    id: 'portfolio',
    title: 'Professional Portfolio Website',
    description: 'Built a professional portfolio website to showcase skills, projects, and experience, enhancing online presence and attracting potential clients or employers.',
    image: '/pictures/Professional Portfolio Website-1.png',
    website: 'https://premsaikilaru-portfolio.netlify.app/',
    tags: ['Web App']
  },
  {
    id: 'automated_email_reply',
    title: 'Automated Email Reply System',
    description: 'AI-powered Email Response Agent that automates client replies in real-time, streamlining business communication with quick, accurate, and context-aware responses.',
    website: '#',
    tags: ['Mobile App', 'AI']
  },
  {
    id: 'lead_coordinator',
    title: 'AI-Powered Lead Coordinator',
    description: 'AI-powered lead coordinator that automates the entire process of handling and managing inquiries from potential tenants. It pre-qualifies leads by analyzing their needs.',
    website: '#',
    tags: ['MobileApp', 'AI']
  },
  {
    id: 'content_generation',
    title: 'Content Generation Platform',
    description: 'AI-powered content creation tool for social media, blogs, and marketing materials.',
    website: '#',
    tags: ['Mobile App', 'AI']
  }
];

// Get projects from localStorage or use default projects if none exist
export const getProjects = () => {
  try {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      // Only add projects that don't already exist (based on ID)
      const existingIds = new Set(defaultProjects.map(p => p.id));
      const newProjects = parsedProjects.filter(p => !existingIds.has(p.id));
      return [...defaultProjects, ...newProjects];
    }
  } catch (error) {
    console.error('Error loading projects from localStorage:', error);
  }
  
  return defaultProjects;
};
