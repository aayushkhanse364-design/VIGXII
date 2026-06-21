// Test API Connection
const BASE_URL = "https://vigxii-visuals-co.onrender.com";

console.log("🔍 Testing API Connection...");
console.log("Base URL:", BASE_URL);

// Test 1: Health Check
fetch(`${BASE_URL}/health`)
  .then(res => {
    console.log("✅ Health Check - Status:", res.status);
    return res.json();
  })
  .then(data => {
    console.log("✅ Health Check - Response:", data);
  })
  .catch(err => {
    console.error("❌ Health Check Failed:", err);
  });

// Test 2: Categories
fetch(`${BASE_URL}/categories`)
  .then(res => {
    console.log("✅ Categories - Status:", res.status);
    console.log("✅ Categories - Headers:", {
      'access-control-allow-origin': res.headers.get('access-control-allow-origin'),
      'content-type': res.headers.get('content-type')
    });
    return res.json();
  })
  .then(data => {
    console.log("✅ Categories - Response:", data);
  })
  .catch(err => {
    console.error("❌ Categories Failed:", err);
    console.error("❌ Error Details:", {
      message: err.message,
      name: err.name,
      stack: err.stack
    });
  });

// Test 3: Projects
fetch(`${BASE_URL}/projects`)
  .then(res => {
    console.log("✅ Projects - Status:", res.status);
    return res.json();
  })
  .then(data => {
    console.log("✅ Projects - Response:", data);
  })
  .catch(err => {
    console.error("❌ Projects Failed:", err);
  });
