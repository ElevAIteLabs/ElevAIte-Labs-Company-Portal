import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from './contexts/AuthContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ContactSection from './components/ContactSection';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ProjectsList from './components/admin/ProjectsList';
import ProjectForm from './components/admin/ProjectForm';
import Login from './components/admin/Login';
import ExpandedAbout from './components/ExpandedAbout';
import BlogPage from './components/BlogPage';
import Projects from './components/Projects';
import './styles/styles.css';
import './styles/admin.css';
import './styles/projects.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <Layout>
            <Hero />
            <MenuSection />
            <ContactSection />
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