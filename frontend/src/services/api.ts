import { auth } from "../config/firebase";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://vigxii-visuals-co.onrender.com";

export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  techStack: string[];
  githubLink?: string;
  categoryId: string;
  createdAt: string;
  type?: "photo" | "video";
}

export interface Category {
  _id: string;
  title: string;
  year: string;
  coverUrl: string;
  order: number;
  createdAt: string;
}

// Sanitize URL - removes extra quotes and malformed characters
const sanitizeUrl = (url: string): string => {
  if (!url) return "";
  return url.replace(/^"+|"+$/g, "").trim();
};

const getAuthToken = async () => {
  const user = auth.currentUser;
  if (!user) return "";
  return await user.getIdToken();
};

// Enhanced fetch with logging and error handling
const fetchWithLogging = async (url: string, options?: RequestInit): Promise<Response> => {
  console.log(`🔵 API Request: ${options?.method || "GET"} ${url}`);
  
  try {
    const res = await fetch(url, options);
    console.log(`✅ API Response: ${res.status} ${url}`);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ API Error: ${res.status} - ${errorText}`);
      throw new Error(`API Error: ${res.status} - ${errorText}`);
    }
    
    return res;
  } catch (error) {
    console.error(`❌ Network Error:`, error);
    throw error;
  }
};

// Health Check
export const checkHealth = async () => {
  const res = await fetchWithLogging(`${BASE_URL}/health`);
  return res.json();
};

// Projects
export const getProjects = async (): Promise<Project[]> => {
  const res = await fetchWithLogging(`${BASE_URL}/projects`);
  const response = await res.json();
  const data = response.data || response; // Handle both wrapped and unwrapped responses
  
  // Sanitize URLs in projects
  const sanitizedData = data.map((project: Project) => ({
    ...project,
    imageUrl: sanitizeUrl(project.imageUrl),
    videoUrl: project.videoUrl ? sanitizeUrl(project.videoUrl) : undefined,
  }));
  
  console.log(`📦 Fetched ${sanitizedData.length} projects:`, sanitizedData);
  return sanitizedData;
};

export const createProject = async (data: Omit<Project, "_id" | "createdAt">): Promise<Project> => {
  const token = await getAuthToken();
  console.log(`📝 Creating project:`, data);
  
  // Sanitize URLs before sending
  const sanitizedData = {
    ...data,
    imageUrl: sanitizeUrl(data.imageUrl),
    videoUrl: data.videoUrl ? sanitizeUrl(data.videoUrl) : undefined,
  };
  
  const res = await fetchWithLogging(`${BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sanitizedData),
  });
  
  const result = await res.json();
  console.log(`✅ Project created:`, result);
  return result;
};

export const updateProject = async (id: string, data: Partial<Project>): Promise<Project> => {
  const token = await getAuthToken();
  console.log(`📝 Updating project ${id}:`, data);
  
  // Sanitize URLs before sending
  const sanitizedData = {
    ...data,
    imageUrl: data.imageUrl ? sanitizeUrl(data.imageUrl) : undefined,
    videoUrl: data.videoUrl ? sanitizeUrl(data.videoUrl) : undefined,
  };
  
  const res = await fetchWithLogging(`${BASE_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sanitizedData),
  });
  
  const result = await res.json();
  console.log(`✅ Project updated:`, result);
  return result;
};

export const deleteProject = async (id: string): Promise<void> => {
  const token = await getAuthToken();
  console.log(`🗑️ Deleting project ${id}`);
  
  await fetchWithLogging(`${BASE_URL}/projects/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  
  console.log(`✅ Project deleted: ${id}`);
};

// Categories
export const getCategories = async (): Promise<Category[]> => {
  const res = await fetchWithLogging(`${BASE_URL}/categories`);
  const response = await res.json();
  const data = response.data || response; // Handle both wrapped and unwrapped responses
  
  // Sanitize URLs in categories
  const sanitizedData = data.map((category: Category) => ({
    ...category,
    coverUrl: sanitizeUrl(category.coverUrl),
  }));
  
  console.log(`📦 Fetched ${sanitizedData.length} categories:`, sanitizedData);
  return sanitizedData;
};

export const createCategory = async (data: Omit<Category, "_id" | "createdAt">): Promise<Category> => {
  const token = await getAuthToken();
  console.log(`📝 Creating category:`, data);
  
  // Sanitize URLs before sending
  const sanitizedData = {
    ...data,
    coverUrl: sanitizeUrl(data.coverUrl),
  };
  
  const res = await fetchWithLogging(`${BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sanitizedData),
  });
  
  const result = await res.json();
  console.log(`✅ Category created:`, result);
  return result;
};

export const updateCategory = async (id: string, data: Partial<Category>): Promise<Category> => {
  const token = await getAuthToken();
  console.log(`📝 Updating category ${id}:`, data);
  
  // Sanitize URLs before sending
  const sanitizedData = {
    ...data,
    coverUrl: data.coverUrl ? sanitizeUrl(data.coverUrl) : undefined,
  };
  
  const res = await fetchWithLogging(`${BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sanitizedData),
  });
  
  const result = await res.json();
  console.log(`✅ Category updated:`, result);
  return result;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const token = await getAuthToken();
  console.log(`🗑️ Deleting category ${id}`);
  
  await fetchWithLogging(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  
  console.log(`✅ Category deleted: ${id}`);
};

// Upload
export const uploadMedia = async (file: File): Promise<{ url: string }> => {
  const token = await getAuthToken();
  console.log(`📤 Uploading file: ${file.name} (${file.size} bytes)`);
  
  if (!token) {
    throw new Error("Authentication required. Please log in again.");
  }
  
  const formData = new FormData();
  formData.append("file", file);
  
  const res = await fetchWithLogging(`${BASE_URL}/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  
  const result = await res.json();
  console.log(`✅ File uploaded - Full response:`, result);
  
  // Handle different response formats
  const uploadedUrl = result.url || result.data?.url || result.imageUrl || result.data?.imageUrl;
  
  if (!uploadedUrl) {
    console.error("❌ No URL in upload response:", result);
    throw new Error("Upload failed: No URL returned from server");
  }
  
  const sanitizedUrl = sanitizeUrl(uploadedUrl);
  console.log(`✅ Sanitized upload URL:`, sanitizedUrl);
  
  return { url: sanitizedUrl };
};
