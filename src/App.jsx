import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from './contexts/AuthContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ProjectsList from './components/admin/ProjectsList';
import ProjectForm from './components/admin/ProjectForm';
import RoleForm from './components/admin/RoleForm';
import RolesList from './components/admin/RolesList';
import ServiceForm from './components/admin/ServiceForm';
import ServicesList from './components/admin/ServicesList';
import Login from './components/admin/Login';
import ExpandedAbout from './components/ExpandedAbout';
import BlogPage from './components/BlogPage';
import Projects from './components/Projects';
import Services from './components/Services';
import Contacts from './components/Contacts';
import Careers from './components/Careers';
import './styles/styles.css';
import './styles/admin.css';
import './styles/projects.css';
import './styles/services.css';
import './styles/responsive.css';

function App() {
  // Handle hash-based scrolling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          // Small timeout to ensure the page has fully rendered
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Handle initial page load with hash
    handleHashChange();

    // Handle hash changes after initial load
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/services" element={
          <Layout>
            <Services />
          </Layout>
        } />
        <Route path="/" element={
          <Layout>
            <Hero />
            <MenuSection />
          </Layout>
        } />

        {/* About Page */}
        <Route path="/about" element={
          <Layout>
            <ExpandedAbout />
          </Layout>
        } />

        {/* Blog Page */}
        <Route path="/blog" element={
          <Layout>
            <BlogPage />
          </Layout>
        } />

        {/* Projects Page */}
        <Route path="/projects" element={
          <Layout>
            <Projects />
          </Layout>
        } />

        <Route path="/contacts" element={
          <Layout>
            <Contacts />
          </Layout>
        } />

        <Route path="/careers" element={
          <Layout>
            <Careers />
          </Layout>
        } />



        {/* Auth Routes */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/edit/:id" element={<ProjectForm />} />
          <Route path="roles" element={<RolesList />} />
          <Route path="roles/new" element={<RoleForm />} />
          <Route path="roles/edit/:id" element={<RoleForm />} />
          <Route path="services" element={<ServicesList />} />
          <Route path="services/new" element={<ServiceForm />} />
          <Route path="services/edit/:id" element={<ServiceForm />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
          </div>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;