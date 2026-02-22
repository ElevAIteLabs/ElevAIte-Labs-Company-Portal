import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/about.css';

const teamMembers = [
  {
    id: 1,
    name: 'Shanmukh',
    role: 'Mobile Application & Web Developer',
    image: '/pictures/Harvey.jpg',
    bio: 'Lead developer with extensive experience in building scalable mobile and web applications. Specializes in React Native and performance optimization.'
  },
  {
    id: 2,
    name: 'Vishnu',
    role: 'Automations & Web Developer',
    image: '/pictures/Louis.jpeg',
    bio: 'Expert in workflow automation and full-stack development. Dedicated to building efficient systems that streamline business processes.'
  },
  {
    id: 3,
    name: 'Prem Sai',
    role: 'AI Automations Specialist',
    image: '/pictures/Mike.jpg',
    bio: 'Specialist in integrating AI solutions into modern web architectures. Focused on creating intelligent, data-driven user experiences.'
  }
];

const ExpandedAbout = () => {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">


      <div className="about-header">
        <h1>Our Story & Mission</h1>
        <p>At ElevAIte Labs, we are a collective of innovators, engineers, and designers dedicated to reshaping how businesses interact with technology through artificial intelligence.</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Core Foundation</h2>
          <div className="mission-vision-grid">
            <div className="mv-card">
              <h3>Our Mission</h3>
              <p>To democratize AI technology by creating accessible, innovative solutions that empower businesses of all sizes to harness the transformative power of artificial intelligence.</p>
              <ul>
                <li>Developing high-impact AI solutions for niche markets</li>
                <li>Reducing implementation barriers for complex technology</li>
                <li>Driving efficiency through custom-tailored automations</li>
              </ul>
            </div>

            <div className="mv-card">
              <h3>Our Vision</h3>
              <p>A future where AI seamlessly integrates into every aspect of operations, acting as a catalyst for human creativity rather than a replacement.</p>
              <ul>
                <li>Building ethical and transparent AI systems</li>
                <li>Setting new standards in digital transformation</li>
                <li>Empowering the next generation of digital-first startups</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>The Team Behind the Vision</h2>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-image-wrapper">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExpandedAbout;
