const API = "http://127.0.0.1:5000";

// LOGIN
function login() {
    const username = document.getElementById("username").value;
    const role = document.getElementById("role").value;

    fetch(API + "/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, role })
    })
    .then(res => res.json())
    .then(data => {
        if (data.role === "vendor") {
            window.location.href = "vendor.html";
        } else {
            window.location.href = "charity.html";
        }
    });
}

// VENDOR POST
function postFood() {
    fetch(API + "/add-food", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            vendor_name: "Vendor",
            food_name: document.getElementById("food").value,
            quantity: document.getElementById("quantity").value,
            location: document.getElementById("location").value,
            pickup_time: document.getElementById("time").value
        })
    })
    .then(() => alert("Food Posted"));
}

// CHARITY VIEW
function loadFood() {
    fetch(API + "/food-list")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("foodList");
            if (!list) return;

            list.innerHTML = "";
            data.forEach(item => {
                list.innerHTML += `
                    <div class="food-card">
                        <strong>${item.food_name}</strong><br>
                        ${item.quantity} | ${item.location}<br>
                        Pickup: ${item.pickup_time}
                    </div>
                `;
            });
        });
}

loadFood();
