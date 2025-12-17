const API = "http://127.0.0.1:5000";
let currentUser = ""; // store logged-in username
let currentRole = ""; // store logged-in role

/* ---------------- LOGIN ---------------- */
function login() {
    const username = document.getElementById("username").value;
    const role = document.getElementById("role").value;

    if(!username){
        alert("Please enter your name");
        return;
    }

    fetch(API + "/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, role})
    })
    .then(res => res.json())
    .then(data => {
        // Save username and role in localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);

        if(data.role === "vendor") window.location.href = "vendor.html";
        else if(data.role === "charity") window.location.href = "charity.html";
    })
    .catch(err => {
        console.error(err);
        alert("Login failed – backend not reachable");
    });
}


/* ---------------- VENDOR ---------------- */
function postFood() {
    const vendorName = localStorage.getItem("username"); // get logged-in vendor name
    const foodName = document.getElementById("food").value;
    const quantity = document.getElementById("quantity").value;
    const location = document.getElementById("location").value;
    const pickupTime = document.getElementById("time").value;

    if(!foodName || !quantity || !location || !pickupTime){
        alert("Please fill all fields");
        return;
    }

    fetch("http://127.0.0.1:5000/add-food", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            vendor_name: vendorName,
            food_name: foodName,
            quantity: quantity,
            location: location,
            pickup_time: pickupTime
        })
    })
    .then(() => {
        alert("Food posted successfully");
        // Clear input fields
        document.getElementById("food").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("location").value = "";
        document.getElementById("time").value = "";
    })
    .catch(err => console.error(err));
}


/* ---------------- CHARITY ---------------- */
function loadFood() {
    fetch(API + "/food-list")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("foodList");
            if(!list) return;
            list.innerHTML = "";
            data.forEach(item => {
                list.innerHTML += `
                    <div class="food-card">
                        <h4>${item.food_name} 🍲</h4>
                        <p><strong>Vendor:</strong> ${item.vendor_name}</p>
                        <p><strong>Quantity:</strong> ${item.quantity}</p>
                        <p><strong>Location:</strong> ${item.location}</p>
                        <p><strong>Pickup Time:</strong> ${item.pickup_time}</p>
                    </div>
                `;
            });
        });
}

// Auto-refresh every 5 seconds for charity page
if(window.location.href.includes("charity.html")){
    setInterval(loadFood, 5000);
    loadFood();
}
