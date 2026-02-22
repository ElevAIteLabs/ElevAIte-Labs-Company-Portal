import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import '../styles/contacts.css';

const Contacts = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contacts-page">
            <div className="contacts-header">
                <h1>Get in Touch</h1>
                <p>Have a question or want to work together? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>

            <div className="contacts-grid">
                <div className="contact-info-card">
                    <div className="contact-info-item">
                        <div className="contact-icon-wrapper">
                            <FiMail />
                        </div>
                        <div className="contact-info-text">
                            <h3>Email Us</h3>
                            <p><a href="mailto:info@elevaite.com">info@elevaite.com</a></p>
                            <p><a href="mailto:support@elevaite.com">support@elevaite.com</a></p>
                        </div>
                    </div>

                    <div className="contact-info-item">
                        <div className="contact-icon-wrapper">
                            <FiPhone />
                        </div>
                        <div className="contact-info-text">
                            <h3>Call Us</h3>
                            <p><a href="tel:+919876543210">+91 98765 43210</a></p>
                            <p>Mon - Fri, 9am - 6pm</p>
                        </div>
                    </div>

                    <div className="contact-info-item">
                        <div className="contact-icon-wrapper">
                            <FiMapPin />
                        </div>
                        <div className="contact-info-text">
                            <h3>Visit Us</h3>
                            <p>Hitech City, Hyderabad,</p>
                            <p>Telangana, India - 500081</p>
                        </div>
                    </div>

                    <div className="contact-socials">
                        <h3>Follow Us</h3>
                        <div className="social-icons-row">
                            <a href="#" className="social-btn"><FiFacebook /></a>
                            <a href="#" className="social-btn"><FiTwitter /></a>
                            <a href="#" className="social-btn"><FiInstagram /></a>
                            <a href="#" className="social-btn"><FiLinkedin /></a>
                        </div>
                    </div>
                </div>

                <div className="contact-form-card">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="How can we help?"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us more about your project..."
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">
                            Send Message <FiSend />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
