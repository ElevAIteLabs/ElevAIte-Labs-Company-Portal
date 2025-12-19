import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiArrowRight, FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';
import '../styles/ContactSection.css';

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with your form submission logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section className="contact-section" id="contact">
      {/* Career CTA Section */}
      <div className="career-cta">
        <div className="container">
          <div className="career-cta-content">
            <div className="career-cta-text">
              <span className="eyebrow">04 CAREER</span>
              <h2>We're always on the lookout for new talent</h2>
              <p>Join our team of innovators and help shape the future of technology.</p>
            </div>
            <div className="career-cta-button">
              <button 
                className="cta-button"
                onClick={() => window.location.href = 'mailto:careers@elevaitelabs.com'}
              >
                <span>JOIN US</span>
                <FiArrowRight className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* Main Contact Section */}
        <div className="contact-content">
          {/* Left Side - Contact Info */}
          <div className="contact-info">
            <span className="eyebrow">05 CONTACT</span>
            <h2>Get in touch with our team to discuss how we can help your business grow and succeed</h2>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="icon-wrapper">
                  <span role="img" aria-label="location">📍</span>
                </div>
                <div>
                  <p className="contact-label">Our Location</p>
                  <p className="contact-detail">123 Tech Park, Hyderabad , India</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="icon-wrapper">
                  <span role="img" aria-label="email">✉️</span>
                </div>
                <div>
                  <p className="contact-label">Email Us</p>
                  <p className="contact-detail">contact@elevaitelabs.com</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="icon-wrapper">
                  <span role="img" aria-label="phone">📞</span>
                </div>
                <div>
                  <p className="contact-label">Call Us</p>
                  <p className="contact-detail">+91 12345 67890</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <FiInstagram />
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="form-input message-input"
                rows="4"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'SENDING...' : (
                <>
                  <span>SUBMIT</span>
                  <FiArrowRight className="arrow-icon" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>
  );
}

export default ContactSection;
