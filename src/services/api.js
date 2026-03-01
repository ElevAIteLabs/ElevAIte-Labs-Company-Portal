const API_BASE_URL = 'https://elevaitelabs.in/api';
export const API_URL = API_BASE_URL;

export const apiService = {
    // ---- Projects (Handled by api/projects.php) ----
    async getProjects() {
        const response = await fetch(`${API_BASE_URL}/projects.php`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        return Array.isArray(data) ? data.map(project => {
            if (typeof project.images === 'string') {
                try { project.images = JSON.parse(project.images); } catch (e) { project.images = []; }
            }
            return project;
        }) : data;
    },

    async getProject(id) {
        const response = await fetch(`${API_BASE_URL}/projects.php?id=${id}`);
        if (!response.ok) throw new Error('Failed to fetch project');
        const data = await response.json();
        if (data && typeof data.images === 'string') {
            try { data.images = JSON.parse(data.images); } catch (e) { data.images = []; }
        }
        return data;
    },

    async createProject(data) {
        const response = await fetch(`${API_BASE_URL}/projects.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create project');
        return response.json();
    },

    async updateProject(id, data) {
        const response = await fetch(`${API_BASE_URL}/projects.php?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update project');
        return response.json();
    },

    async deleteProject(id) {
        const response = await fetch(`${API_BASE_URL}/projects.php?id=${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete project');
        return response.json();
    },

    // ---- Services (Handled by api/services.php) ----
    async getServices() {
        const response = await fetch(`${API_BASE_URL}/services.php`);
        if (!response.ok) throw new Error('Failed to fetch services');
        return response.json();
    },

    async getService(id) {
        const response = await fetch(`${API_BASE_URL}/services.php?id=${id}`);
        if (!response.ok) throw new Error('Failed to fetch service');
        return response.json();
    },

    async saveService(data) {
        // This handles both Create and Update via one POST endpoint
        const response = await fetch(`${API_BASE_URL}/services.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to save service');
        return response.json();
    },

    async deleteService(id) {
        const response = await fetch(`${API_BASE_URL}/services.php?id=${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete service');
        return response.json();
    },

    // ---- Vacant Roles (Handled by api/roles.php) ----
    async getRoles() {
        const response = await fetch(`${API_BASE_URL}/roles.php`);
        if (!response.ok) throw new Error('Failed to fetch roles');
        return response.json();
    },

    async getRole(id) {
        const response = await fetch(`${API_BASE_URL}/roles.php?id=${id}`);
        if (!response.ok) throw new Error('Failed to fetch role');
        return response.json();
    },

    async createRole(data) {
        const response = await fetch(`${API_BASE_URL}/roles.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create role');
        return response.json();
    },

    async updateRole(id, data) {
        const response = await fetch(`${API_BASE_URL}/roles.php?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update role');
        return response.json();
    },

    async deleteRole(id) {
        const response = await fetch(`${API_BASE_URL}/roles.php?id=${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete role');
        return response.json();
    }
};
