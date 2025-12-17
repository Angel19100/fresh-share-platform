from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

DB = "database.db"

# ---------- DATABASE SETUP ----------
def init_db():
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        role TEXT
    )
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS surplus_food (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vendor_name TEXT,
        food_name TEXT,
        quantity TEXT,
        location TEXT,
        pickup_time TEXT
    )
    """)
    conn.commit()
    conn.close()

init_db()

# ---------- LOGIN ----------
@app.route("/login", methods=["POST", "OPTIONS"])
def login():
    if request.method == "OPTIONS":
        return "", 200
    data = request.get_json()
    username = data.get("username")
    role = data.get("role")
    if not username or not role:
        return jsonify({"error": "Missing username or role"}), 400

    # save user
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username, role) VALUES (?, ?)", (username, role))
    conn.commit()
    conn.close()

    return jsonify({"role": role}), 200

# ---------- VENDOR POSTS FOOD ----------
@app.route("/add-food", methods=["POST", "OPTIONS"])
def add_food():
    if request.method == "OPTIONS":
        return "", 200
    data = request.get_json()
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO surplus_food (vendor_name, food_name, quantity, location, pickup_time)
        VALUES (?, ?, ?, ?, ?)
    """, (
        data.get("vendor_name"),
        data.get("food_name"),
        data.get("quantity"),
        data.get("location"),
        data.get("pickup_time")
    ))
    conn.commit()
    conn.close()
    return jsonify({"message": "Food posted successfully"}), 200

# ---------- CHARITY VIEWS FOOD ----------
@app.route("/food-list", methods=["GET", "OPTIONS"])
def food_list():
    if request.method == "OPTIONS":
        return "", 200
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("SELECT vendor_name, food_name, quantity, location, pickup_time FROM surplus_food")
    rows = cursor.fetchall()
    conn.close()
    food_items = []
    for row in rows:
        food_items.append({
            "vendor_name": row[0],
            "food_name": row[1],
            "quantity": row[2],
            "location": row[3],
            "pickup_time": row[4]
        })
    return jsonify(food_items), 200

if __name__ == "__main__":
    app.run(debug=True)
