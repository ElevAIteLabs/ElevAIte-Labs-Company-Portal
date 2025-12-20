import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExpandedAbout from './ExpandedAbout';

// Menu items for navigation
const menuItems = [
  { 
    id: 'about',
    label: 'ABOUT',
    headline: 'ABOUT US',
    body: 'We are a team of passionate AI innovators, developers, and strategists dedicated to transforming businesses through cutting-edge artificial intelligence solutions.',
    sectionTitle: 'ABOUT',
    points: [
      'OUR MISSION-To democratize AI technology by creating accessible, innovative solutions that empower businesses of all sizes to harness the transformative power of artificial intelligence.',
      'OUR VISION-A future where AI seamlessly integrates into every aspect of business operations, driving unprecedented efficiency, creativity, and growth.',
    ]
  },
  { 
    id: 'services',
    label: 'SERVICES',
    headline: 'My Services',
    body: 'I offer a range of services to help bring your ideas to life.',
    sectionTitle: 'SERVICES'
  },
  { 
    id: 'projects',
    label: 'PROJECTS',
    headline: 'My Work',
    body: 'Here are some of my recent projects.',
    sectionTitle: 'PROJECTS'
  },
  { 
    id: 'blog',
    label: 'BLOG',
    headline: 'AI Insights & Innovation',
    description: 'Stay ahead of the curve with our latest thoughts on AI development, emerging technologies, and industry trends.'
  }
];

// Service slides data
const serviceSlides = [
  {
    title: 'Mobile App Development',
    subtitle: 'Native iOS & Android applications powered by cutting-edge AI technology.',
    features: [
      'Native iOS & Android Development',
      'AI Integration & Machine Learning',
      'Cloud Synchronization',
      'Cross-platform Solutions',
      'Real-time Data Processing',
      'Advanced Security Features',
    ],
    techs: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'TensorFlow Lite'],
  },
  {
    title: 'Web App Development',
    subtitle: 'Responsive, scalable web applications with modern frameworks.',
    features: [
      'Progressive Web Apps (PWA)',
      'AI-Powered Features',
      'Advanced Analytics',
      'Responsive Design',
      'Real-time Collaboration',
      'API Integration',
    ],
    techs: ['React', 'Next.js', 'Vue.js', 'Node.js', 'Python'],
  },
  {
    title: 'AI Automation',
    subtitle: 'Intelligent automation solutions to streamline your workflows.',
    features: [
      'Process Automation',
      'Data Processing',
      'Custom APIs',
      'Workflow Optimization',
      'Integration Solutions',
      'Monitoring & Analytics',
    ],
    techs: ['Python', 'Zapier', 'Make.com', 'AWS Lambda', 'Azure Functions'],
  },
  {
    title: 'AI Agents & Chatbots',
    subtitle: 'Intelligent conversational AI and custom agent development.',
    features: [
      'Custom ChatBot Development',
      'Multi-platform Integration',
      'Sentiment Analysis',
      'Natural Language Processing',
      'Voice Recognition',
      'Continuous Learning',
    ],
    techs: ['OpenAI GPT', 'Dialogflow', 'Rasa', 'TensorFlow', 'PyTorch'],
  },
  {
    title: 'AI Content Creation',
    subtitle: 'Automated content generation and creative AI solutions.',
    features: [
      'Content Generation',
      'Copy Writing',
      'Brand Asset Generation',
      'Image & Video Creation',
      'Social Media Automation',
      'Creative Workflows',
    ],
    techs: ['GPT-4', 'DALL-E', 'Midjourney', 'Stable Diffusion', 'Adobe APIs'],
  },
];

// Project images
const projectImages = {
  chaitanyamrutha: [
    '/pictures/p1-2.png',
    '/pictures/p1.png',
    '/pictures/p1-3.png'
  ],
  beesuitz: [
    '/pictures/bee suitz-2.png',
    '/pictures/bee suitz-1.png',
    '/pictures/bee suitz-3.png'
  ],
  portfolio: [
    '/pictures/Professional Portfolio Website-2.png',
    '/pictures/Professional Portfolio Website-1.png',
    '/pictures/Professional Portfolio Website-3.png'
  ]
};

// Get projects from localStorage or use default projects if none exist
const getCombinedProjects = () => {
  const defaultProjects = [
    {
      id: 'chaitanyamrutha',
      title: 'Chaitan yamrutha ',
      description: 'A website promoting a lifestyle of simplicity and mindful growth through initiatives like organic farming, animal welfare, education, healthcare, and food for life, built to inspire and serve communities worldwide.',
      images: projectImages.chaitanyamrutha,
      website: 'https://chaitanyamrutha.org/'
    },
    {
      id: 'beesuitz',
      title: 'Bee Suitz',
      description: 'Designed and developed Bee Suitz,comprehensive AI enablement platform designed to unify education and execution.',
      images: projectImages.beesuitz,
      website: 'https://beesuitz.com/'
    },
    {
      id: 'portfolio',
      title: 'Professional Portfolio Website',
      description: 'Built a professional portfolio website to showcase skills, projects, enhancing online presence and attracting potential clients or employers.',
      images: projectImages.portfolio,
      website: 'https://premsaikilaru-portfolio.netlify.app/'
    },
    {
      id: 'automated_email_reply',
      title: 'Automated Email Reply System',
      description: 'AI-powered Email Response Agent that automates client replies in real-time, streamlining business communication with quick, accurate, and context-aware responses.',
      website: '#'
    },
    {
      id: 'lead_coordinator',
      title: 'AI-Powered Lead Coordinator Automation Agent',
      description: 'AI-powered lead coordinator that automates the entire process of handling and managing inquiries from potential tenants. It pre-qualifies leads by analyzing their needs',
      website: '#'
    },
    {
      id: 'content_generation',
      title: 'Content Generation Platform',
      description: 'AI-powered content creation tool for social media, blogs, and marketing materials.',
      website: '#'
    }
  ];

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

const MenuSection = () => {
  const [projects, setProjects] = useState(getCombinedProjects());
  const [activeId, setActiveId] = useState(menuItems[0].id);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const activeItem = menuItems.find((item) => item.id === activeId);
  const currentSlide = serviceSlides[serviceIndex % serviceSlides.length];
  const currentProject = projects[projectIndex % projects.length];

  // Listen for storage events to update projects when they change in admin
  useEffect(() => {
    const handleStorageChange = () => {
      setProjects(getCombinedProjects());
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes periodically in case the event doesn't fire
    const interval = setInterval(() => {
      const savedProjects = localStorage.getItem('projects');
      if (savedProjects) {
        const currentProjects = JSON.stringify(projects);
        if (savedProjects !== currentProjects) {
          setProjects(getCombinedProjects());
        }
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [projects]);

  const clients = [
    { 
      id: 'CHAITANYAMRUTHA', 
      label: 'CHAITANYAMRUTHA', 
      image: '/pictures/Chaitanyamrutha.jpg',
      emoji: '📸'
    },
    {
      id: 'GENZ_IQ',
      label: 'GenZ IQ',
      image: '/pictures/genz iq logo.png',
      emoji: '🧠'
    },
    {
      id: 'MAMA_MAGIC',
      label: 'Mama Magic',
      image: '/pictures/mama magic logo.png',
      emoji: '✨'
    },
    {
      id: 'SREE_NANDA',
      label: 'Sree Nanda',
      image: '/pictures/sree nanda logo.png',
      emoji: '🎓'
    },
    {
      id: 'SREE_SIVANI',
      label: 'Sree Sivani School',
      image: '/pictures/sree sivani scl.png',
      emoji: '🏫'
    }
  ];

  const goServiceNext = () => {
    setServiceIndex((prev) => (prev + 1) % serviceSlides.length);
  };

  const goServicePrev = () => {
    setServiceIndex((prev) => (prev - 1 + serviceSlides.length) % serviceSlides.length);
  };
  
  const goProjectNext = () => {
    setProjectIndex((prev) => (prev + 1) % projects.length);
  };
  
  const goProjectPrev = () => {
    setProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <>
      <div className="geometric-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
      <section id="menu-section" className="menu-section">
      <div className="menu-section__eyebrow">02 MENU SECTION</div>
      <div className="menu-section__grid">
        <ul className="menu-section__list" aria-label="Navigate showcase panels">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`menu-section__item ${activeId === item.id ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
                onClick={() => setActiveId(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="menu-section__panel" aria-live="polite">
          {activeId === 'services' && (
            <>
              <button className="menu-section__nav-btn is-left" onClick={goServicePrev} aria-label="Previous service slide">
                ←
              </button>
              <button className="menu-section__nav-btn is-right" onClick={goServiceNext} aria-label="Next service slide">
                →
              </button>
            </>
          )}

          {activeId === 'services' ? (
            <>
              <div className="menu-section__section-title">{menuItems.find((m) => m.id === 'services')?.sectionTitle || 'SERVICES'}</div>
              <div className="menu-section__panel-header">{currentSlide.title}</div>
              <p className="menu-section__panel-body">{currentSlide.subtitle}</p>

              <div className="menu-section__features">
                {currentSlide.features.map((feature) => (
                  <div className="menu-section__feature" key={feature}>
                    <span className="menu-section__feature-check">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="menu-section__tech-chips">
                {currentSlide.techs?.map((tech) => (
                  <span className="menu-section__chip" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </>
          ) : activeId === 'projects' ? (
            <>
              <button className="menu-section__nav-btn is-left" onClick={goProjectPrev} aria-label="Previous project">
                ←
              </button>
              <button className="menu-section__nav-btn is-right" onClick={goProjectNext} aria-label="Next project">
                →
              </button>
              <div className="menu-section__section-title">PROJECTS</div>
              <div className="project-container">
                <div className="project-content">
                  <div className="project-header">
                    <div className="menu-section__panel-header">{currentProject.title}</div>
                    {currentProject.website && currentProject.website !== '#' && (
                      <a 
                        href={currentProject.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-maximize"
                        aria-label={`View ${currentProject.title} website`}
                        style={{ position: 'relative', zIndex: 1000 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(currentProject.website, '_blank');
                        }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 3h6v6"></path>
                          <path d="M10 14L21 3"></path>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="menu-section__panel-body" style={{ marginBottom: '1rem' }}>
                    {projectIndex === 0 
                      ? 'A website promoting a lifestyle of simplicity and mindful growth through various community initiatives.'
                      : currentProject.description
                    }
                  </p>
                </div>
                
                {currentProject.images && (
                  <div className="project-image-stack">
                    {currentProject.images.map((img, index) => (
                      <img 
                        key={index}
                        src={img} 
                        alt={`${currentProject.title} screenshot ${index + 1}`}
                        className="project-image"
                        style={{
                          width: index === 1 ? '55%' : '45%',
                          zIndex: index === 1 ? 3 : 2 - index,
                        }}
                        onMouseEnter={(e) => {
                          if (index === 0) {
                            e.target.style.transform = 'rotate(-5deg) translateY(-10px)';
                          } else if (index === 1) {
                            e.target.style.transform = 'rotate(0) translateY(-15px)';
                          } else {
                            e.target.style.transform = 'rotate(5deg) translateY(-10px)';
                          }
                          e.target.style.zIndex = '4';
                        }}
                        onMouseLeave={(e) => {
                          if (index === 0) {
                            e.target.style.transform = 'rotate(-3deg) translateY(0)';
                          } else if (index === 1) {
                            e.target.style.transform = 'rotate(2deg) translateY(-5px)';
                          } else {
                            e.target.style.transform = 'rotate(3deg) translateY(0)';
                          }
                          e.target.style.zIndex = index === 1 ? '3' : '2';
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : activeId === 'about' ? (
            <>
              <div className="menu-section__section-title" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{activeItem.headline}</div>
              <p className="menu-section__panel-body" style={{ marginBottom: '1.5rem' }}>{activeItem.body}</p>
              
              <ul style={{ 
                margin: '0.5rem 0 2rem 0',
                padding: '0',
                listStyle: 'none'
              }}>
                {activeItem.points && activeItem.points.map((point, index) => {
                  // Split the point into title and description if it contains a dash
                  const [title, ...descriptionParts] = point.split('-');
                  const description = descriptionParts.join('-');
                  
                  return (
                    <li key={index} style={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '1rem',
                      padding: '0',
                      fontSize: '0.95rem',
                      color: 'var(--text-gray)'
                    }}>
                      <span style={{ 
                        display: 'inline-block',
                        color: 'var(--accent-blue)',
                        marginRight: '0.75rem',
                        lineHeight: '1.5',
                        fontWeight: 'bold',
                        minWidth: '100px'
                      }}>
                        {title}
                      </span>
                      <span style={{ 
                        lineHeight: '1.5',
                        flex: 1
                      }}>
                        {description}
                      </span>
                    </li>
                  );
                })}
              </ul>
              
              <Link
                to="/about"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--accent-blue)',
                  color: 'var(--accent-blue)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  margin: '0 auto'
                }}
                className="view-profile-button"
              >
                View Full Profile
                <span style={{ marginLeft: '0.5rem' }}>→</span>
              </Link>
            </>
          ) : activeId === 'blog' ? (
            <>
              <div className="menu-section__section-title" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{activeItem.headline}</div>
              <p className="menu-section__panel-body" style={{ marginBottom: '1.5rem' }}>{activeItem.description}</p>
              
              <ul style={{ 
                margin: '0.5rem 0 1rem 0',
                padding: '0',
                listStyle: 'none'
              }}>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem',
                  padding: '0',
                  fontSize: '0.95rem',
                  color: 'var(--text-gray)'
                }}>
                  <span style={{ 
                    display: 'inline-block',
                    color: 'var(--accent-blue)',
                    marginRight: '0.75rem',
                    lineHeight: '1.3',
                    fontWeight: 'bold',
                    minWidth: '100px',
                    fontSize: '0.9rem'
                  }}>
                    FEATURED
                  </span>
                  <span style={{ 
                    lineHeight: '1.3',
                    flex: 1,
                    fontSize: '0.95rem'
                  }}>
                    The Future of AI in Mobile App Development
                  </span>
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem',
                  padding: '0',
                  fontSize: '0.95rem',
                  color: 'var(--text-gray)'
                }}>
                  <span style={{ 
                    display: 'inline-block',
                    color: 'var(--accent-blue)',
                    marginRight: '0.75rem',
                    lineHeight: '1.3',
                    fontWeight: 'bold',
                    minWidth: '100px',
                    fontSize: '0.9rem',
                    visibility: 'hidden'
                  }}>
                    FEATURED
                  </span>
                  <span style={{ 
                    lineHeight: '1.3',
                    flex: 1,
                    fontSize: '0.95rem'
                  }}>
                    Building Intelligent Automation Systems
                  </span>
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem',
                  padding: '0',
                  fontSize: '0.95rem',
                  color: 'var(--text-gray)'
                }}>
                  <span style={{ 
                    display: 'inline-block',
                    color: 'var(--accent-blue)',
                    marginRight: '0.75rem',
                    lineHeight: '1.3',
                    fontWeight: 'bold',
                    minWidth: '100px',
                    fontSize: '0.9rem',
                    visibility: 'hidden'
                  }}>
                    FEATURED
                  </span>
                  <span style={{ 
                    lineHeight: '1.3',
                    flex: 1,
                    fontSize: '0.95rem'
                  }}>
                    Natural Language Processing in Customer Service
                  </span>
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem',
                  padding: '0',
                  fontSize: '0.95rem',
                  color: 'var(--text-gray)'
                }}>
                  <span style={{ 
                    display: 'inline-block',
                    color: 'var(--accent-blue)',
                    marginRight: '0.75rem',
                    lineHeight: '1.3',
                    fontWeight: 'bold',
                    minWidth: '100px',
                    fontSize: '0.9rem',
                    visibility: 'hidden'
                  }}>
                    FEATURED
                  </span>
                  <span style={{ 
                    lineHeight: '1.3',
                    flex: 1,
                    fontSize: '0.95rem'
                  }}>
                    Web3 and AI: The Next Digital Revolution
                  </span>
                </li>
                <li style={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem',
                  padding: '0',
                  fontSize: '0.95rem',
                  color: 'var(--text-gray)'
                }}>
                  <span style={{ 
                    display: 'inline-block',
                    color: 'var(--accent-blue)',
                    marginRight: '0.75rem',
                    lineHeight: '1.3',
                    fontWeight: 'bold',
                    minWidth: '100px',
                    fontSize: '0.9rem',
                    visibility: 'hidden'
                  }}>
                    FEATURED
                  </span>
                  <span style={{ 
                    lineHeight: '1.3',
                    flex: 1,
                    fontSize: '0.95rem'
                  }}>
                    Ethical AI Development: Best Practices
                  </span>
                </li>
              </ul>
              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <Link 
                  to="/blog" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: 'var(--accent-blue)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    position: 'relative',
                    padding: '0.5rem 0',
                    transition: 'all 0.3s ease',
                    ':hover': {
                      color: 'var(--light-blue)'
                    },
                    '::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0',
                      height: '2px',
                      bottom: '0',
                      left: '0',
                      backgroundColor: 'var(--accent-blue)',
                      transition: 'width 0.3s ease',
                    },
                    ':hover::after': {
                      width: '100%',
                      backgroundColor: 'var(--light-blue)'
                    }
                  }}
                >
                  Read More
                  <span style={{
                    marginLeft: '0.5rem',
                    fontSize: '1.1rem',
                    transition: 'transform 0.3s ease',
                    display: 'inline-block',
                    transform: 'translateX(0)'
                  }}>
                    →
                  </span>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="menu-section__panel-header">{activeItem.headline}</div>
              <p className="menu-section__panel-body">{activeItem.body}</p>
            </>
          )}
        </div>
      </div>

      <div className="clients-section">
        <div className="clients-section__eyebrow">03 CLIENTS</div>
        <div className="clients-marquee">
          <div className="clients-marquee__track">
            {[...clients, ...clients].map((client, idx) => (
              <div 
                key={`${client.id}-${idx}`} 
                className="client-badge" 
                style={{ 
                  background: client.bg, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '1.5rem 2rem' 
                }}
              >
                {client.image ? (
                  <img 
                    src={client.image} 
                    alt={client.label} 
                    className="client-logo"
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      display: 'block',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                ) : (
                  <span 
                    className="client-emoji" 
                    style={{ fontSize: '2rem' }} 
                    aria-hidden="true"
                  >
                    {client.emoji}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </section>
    </>
  );
}

export default MenuSection;
