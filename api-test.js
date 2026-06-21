// API Test Utility - Run in Browser Console
// Copy and paste this in DevTools Console to test your API

const API_BASE = "https://vigxii-visuals-co.onrender.com";

// Test Health
async function testHealth() {
  console.log("🔍 Testing Health Endpoint...");
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    console.log("✅ Health:", data);
  } catch (err) {
    console.error("❌ Health failed:", err);
  }
}

// Test Categories
async function testCategories() {
  console.log("🔍 Testing Categories Endpoint...");
  try {
    const res = await fetch(`${API_BASE}/categories`);
    const data = await res.json();
    console.log(`✅ Categories (${data.length}):`, data);
    
    // Check for URL issues
    data.forEach(cat => {
      if (cat.coverUrl.includes('"')) {
        console.warn("⚠️ Found quotes in URL:", cat.coverUrl);
      }
    });
  } catch (err) {
    console.error("❌ Categories failed:", err);
  }
}

// Test Projects
async function testProjects() {
  console.log("🔍 Testing Projects Endpoint...");
  try {
    const res = await fetch(`${API_BASE}/projects`);
    const data = await res.json();
    console.log(`✅ Projects (${data.length}):`, data);
    
    // Check for URL issues
    data.forEach(proj => {
      if (proj.imageUrl.includes('"')) {
        console.warn("⚠️ Found quotes in URL:", proj.imageUrl);
      }
    });
    
    // Group by category
    const grouped = data.reduce((acc, proj) => {
      acc[proj.categoryId] = (acc[proj.categoryId] || 0) + 1;
      return acc;
    }, {});
    console.log("📊 Projects per category:", grouped);
  } catch (err) {
    console.error("❌ Projects failed:", err);
  }
}

// Test All
async function testAll() {
  await testHealth();
  await testCategories();
  await testProjects();
  console.log("🎉 All tests completed!");
}

// Export functions
window.apiTest = {
  health: testHealth,
  categories: testCategories,
  projects: testProjects,
  all: testAll
};

console.log("API Test Utility Loaded!");
console.log("Usage:");
console.log("  apiTest.all()        - Run all tests");
console.log("  apiTest.health()     - Test health endpoint");
console.log("  apiTest.categories() - Test categories");
console.log("  apiTest.projects()   - Test projects");
