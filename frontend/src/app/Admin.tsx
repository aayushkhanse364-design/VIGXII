import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, X, Upload, LogOut, Mail } from "lucide-react";
import {
  getCategories,
  getProjects,
  createCategory,
  updateCategory,
  deleteCategory,
  createProject,
  updateProject,
  deleteProject,
  uploadMedia,
  Category,
  Project,
} from "../services/api";
import { loginWithEmail, loginWithGoogle, logout, onAuthChange, isAdminEmail } from "../services/auth";
import { User } from "firebase/auth";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      if (authUser && isAdminEmail(authUser.email)) {
        setUser(authUser);
        loadData();
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadData = async () => {
    console.log("🔄 [Admin] Loading data...");
    try {
      setLoading(true);
      const [cats, projs] = await Promise.all([getCategories(), getProjects()]);
      console.log(`✅ [Admin] Loaded ${cats.length} categories, ${projs.length} projects`);
      setCategories(cats.sort((a, b) => a.order - b.order));
      setProjects(projs);
    } catch (err) {
      console.error("❌ [Admin] Failed to load:", err);
      alert("Failed to load data. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          </div>
          <button
            onClick={async () => {
              await logout();
              setUser(null);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="space-y-8">
            {/* Categories Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Categories</h2>
                <button
                  onClick={() => setShowCategoryForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Plus size={18} /> Add Category
                </button>
              </div>
              <div className="grid gap-4">
                {categories.map((cat) => (
                  <div key={cat._id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img src={cat.coverUrl} alt={cat.title} className="w-24 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{cat.title}</h3>
                      <p className="text-sm text-gray-500">Year: {cat.year} | Order: {cat.order}</p>
                    </div>
                    <button
                      onClick={() => { setEditingCategory(cat); setShowCategoryForm(true); }}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm("Delete this category?")) {
                          try {
                            console.log(`🗑️ Deleting category: ${cat._id}`);
                            await deleteCategory(cat._id);
                            console.log("✅ Category deleted successfully");
                            await loadData();
                          } catch (err) {
                            console.error("❌ Failed to delete category:", err);
                            alert("Failed to delete category. Please try again.");
                          }
                        }
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Projects</h2>
                <button
                  onClick={() => setShowProjectForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <Plus size={18} /> Add Project
                </button>
              </div>
              <div className="grid gap-4">
                {projects.map((proj) => (
                  <div key={proj._id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img src={proj.imageUrl} alt={proj.title} className="w-24 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{proj.title}</h3>
                      <p className="text-sm text-gray-500">{proj.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Category: {categories.find(c => c._id === proj.categoryId)?.title || "N/A"}
                      </p>
                    </div>
                    <button
                      onClick={() => { setEditingProject(proj); setShowProjectForm(true); }}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm("Delete this project?")) {
                          try {
                            console.log(`🗑️ Deleting project: ${proj._id}`);
                            await deleteProject(proj._id);
                            console.log("✅ Project deleted successfully");
                            await loadData();
                          } catch (err) {
                            console.error("❌ Failed to delete project:", err);
                            alert("Failed to delete project. Please try again.");
                          }
                        }
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Category Form Modal */}
        {showCategoryForm && (
          <CategoryForm
            category={editingCategory}
            onClose={() => { setShowCategoryForm(false); setEditingCategory(null); }}
            onSave={async (data) => {
              try {
                console.log("💾 Saving category...", data);
                if (editingCategory) {
                  await updateCategory(editingCategory._id, data);
                  console.log("✅ Category updated");
                } else {
                  await createCategory(data);
                  console.log("✅ Category created");
                }
                setShowCategoryForm(false);
                setEditingCategory(null);
                await loadData();
              } catch (err) {
                console.error("❌ Failed to save category:", err);
                alert("Failed to save category. Please try again.");
              }
            }}
          />
        )}

        {/* Project Form Modal */}
        {showProjectForm && (
          <ProjectForm
            project={editingProject}
            categories={categories}
            onClose={() => { setShowProjectForm(false); setEditingProject(null); }}
            onSave={async (data) => {
              try {
                console.log("💾 Saving project...", data);
                if (editingProject) {
                  await updateProject(editingProject._id, data);
                  console.log("✅ Project updated");
                } else {
                  await createProject(data);
                  console.log("✅ Project created");
                }
                setShowProjectForm(false);
                setEditingProject(null);
                await loadData();
              } catch (err) {
                console.error("❌ Failed to save project:", err);
                alert("Failed to save project. Please try again.");
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

function CategoryForm({
  category,
  onClose,
  onSave,
}: {
  category: Category | null;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}) {
  const [form, setForm] = useState({
    title: category?.title || "",
    year: category?.year || new Date().getFullYear().toString(),
    coverUrl: category?.coverUrl || "",
    order: category?.order || 0,
  });
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    console.log(`📤 Uploading category cover: ${file.name}`);
    setUploading(true);
    
    try {
      const { url } = await uploadMedia(file);
      console.log(`✅ Category cover uploaded successfully: ${url}`);
      setForm({ ...form, coverUrl: url });
      alert(`Upload successful! URL: ${url.substring(0, 50)}...`);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      alert(`Upload failed: ${errorMessage}. Please check the browser console for details.`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{category ? "Edit" : "Add"} Category</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Order"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <div>
            <input
              type="text"
              placeholder="Cover URL"
              value={form.coverUrl}
              onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg mb-2"
            />
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
              <Upload size={18} />
              {uploading ? "Uploading..." : "Upload Image"}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleUpload} 
                className="hidden" 
                disabled={uploading}
              />
            </label>
          </div>
          {form.coverUrl && <img src={form.coverUrl} alt="Preview" className="w-full h-32 object-cover rounded" />}
          <button
            onClick={() => {
              if (!form.title.trim()) {
                alert("Please enter a title");
                return;
              }
              if (!form.year.trim()) {
                alert("Please enter a year");
                return;
              }
              if (!form.coverUrl.trim()) {
                alert("Please upload an image or provide a cover URL");
                return;
              }
              onSave(form);
            }}
            disabled={uploading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectForm({
  project,
  categories,
  onClose,
  onSave,
}: {
  project: Project | null;
  categories: Category[];
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}) {
  const [form, setForm] = useState({
    title: project?.title || "",
    description: project?.description || "",
    imageUrl: project?.imageUrl || "",
    videoUrl: project?.videoUrl || "",
    techStack: project?.techStack || [],
    githubLink: project?.githubLink || "",
    categoryId: project?.categoryId || "",
    type: project?.type || "photo",
  });
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const isVideo = file.type.startsWith('video/');
    console.log(`📤 Uploading project ${isVideo ? 'video' : 'image'}: ${file.name}`);
    setUploading(true);
    
    try {
      const { url } = await uploadMedia(file);
      console.log(`✅ Project ${isVideo ? 'video' : 'image'} uploaded successfully: ${url}`);
      
      if (isVideo) {
        setForm({ ...form, videoUrl: url, imageUrl: "" });
      } else {
        setForm({ ...form, imageUrl: url, videoUrl: "" });
      }
      
      alert(`Upload successful! ${isVideo ? 'Video' : 'Image'} URL: ${url.substring(0, 50)}...`);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      alert(`Upload failed: ${errorMessage}. Please check the browser console for details.`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-md my-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{project ? "Edit" : "Add"} Project</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.title}</option>
            ))}
          </select>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as "photo" | "video" })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
          
          {form.type === "photo" ? (
            <div>
              <input
                type="text"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg mb-2"
              />
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                <Upload size={18} />
                {uploading ? "Uploading..." : "Upload Image"}
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
              </label>
              {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="w-full h-32 object-cover rounded mt-2" />}
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Video URL"
                value={form.videoUrl}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg mb-2"
              />
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                <Upload size={18} />
                {uploading ? "Uploading..." : "Upload Video"}
                <input type="file" accept="video/*" onChange={handleUpload} className="hidden" disabled={uploading} />
              </label>
              {form.videoUrl && <video src={form.videoUrl} className="w-full h-32 object-cover rounded mt-2" controls />}
            </div>
          )}
          
          <button
            onClick={() => {
              if (!form.categoryId) {
                alert("Please select a category");
                return;
              }
              if (form.type === "photo" && !form.imageUrl) {
                alert("Please upload an image or provide an image URL");
                return;
              }
              if (form.type === "video" && !form.videoUrl) {
                alert("Please upload a video or provide a video URL");
                return;
              }
              
              // Auto-generate title and description
              const category = categories.find(c => c._id === form.categoryId);
              const projectData = {
                ...form,
                title: category?.title || "Untitled",
                description: `Media uploaded for ${category?.title || 'project'}.`,
                techStack: ["Media"],
                githubLink: "",
              };
              
              onSave(projectData);
            }}
            disabled={uploading}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await loginWithEmail(email, password);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-gray-500 text-sm">VIGXII Visuals Co.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Mail size={18} />
            {loading ? "Logging in..." : "Login with Email"}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {loading ? "Logging in..." : "Continue with Google"}
        </button>

        <p className="text-center text-xs text-gray-500 mt-6">
          Only authorized admin emails can access this panel
        </p>
      </div>
    </div>
  );
}
