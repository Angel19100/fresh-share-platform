// Detect environment: local or Docker
const API = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:5000"   // Local Flask backend
    : "http://backend:5000";    // Docker backend service

// ------------------- LOGIN FUNCTION -------------------
async function login() {
    const username = document.getElementById("username").value.trim();
    const role = document.getElementById("role").value;

    if (!username) {
        alert("Please enter your name");
        return;
    }

    try {
        const response = await fetch(`${API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, role })
        });

        if (!response.ok) {
            alert("Login failed: backend not reachable");
            return;
        }

        const data = await response.json();
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);

        // Redirect based on role
        if (role === "vendor") {
            window.location.href = "vendor.html";
        } else if (role === "charity") {
            window.location.href = "charity.html";
        }
    } catch (err) {
        alert("Error connecting to backend: " + err.message);
    }
}

// ------------------- VENDOR: POST FOOD -------------------
async function postFood() {
    const vendor_name = localStorage.getItem("username");
    const food_name = document.getElementById("food").value.trim();
    const quantity = document.getElementById("quantity").value.trim();
    const location = document.getElementById("location").value.trim();
    const pickup_time = document.getElementById("time").value.trim();

    if (!food_name || !quantity || !location || !pickup_time) {
        alert("Please fill all fields");
        return;
    }

    try {
        const response = await fetch(`${API}/add-food`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ vendor_name, food_name, quantity, location, pickup_time })
        });

        if (!response.ok) {
            alert("Failed to post food");
            return;
        }

        const data = await response.json();
        alert(data.message);
        // Clear inputs
        document.getElementById("food").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("location").value = "";
        document.getElementById("time").value = "";
    } catch (err) {
        alert("Error connecting to backend: " + err.message);
    }
}

// ------------------- CHARITY: LOAD FOOD LIST -------------------
async function loadFood() {
    try {
        const response = await fetch(`${API}/food-list`);
        if (!response.ok) {
            alert("Failed to fetch food list");
            return;
        }

        const foodList = await response.json();
        const container = document.getElementById("food-container");
if (!container) return; // prevent error if container not found

        
        if (foodList.length === 0) {
            container.innerHTML = "<p>No available food right now.</p>";
            return;
        }

        foodList.forEach(item => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h3>${item.food_name}</h3>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Pickup Time:</strong> ${item.pickup_time}</p>
                <p><strong>Vendor:</strong> ${item.vendor_name}</p>
            `;
            container.appendChild(card);
        });
    } catch (err) {
        alert("Error fetching food list: " + err.message);
    }
}

// ------------------- AUTO-REFRESH FOR CHARITY DASHBOARD -------------------
if (localStorage.getItem("role") === "charity") {
    loadFood();
    setInterval(loadFood, 5000); // refresh every 5 seconds
}
