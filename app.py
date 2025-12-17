from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from models import create_tables

app = Flask(__name__)
CORS(app)

create_tables()

def get_db():
    return sqlite3.connect("database.db")

# ---------- LOGIN ----------
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data["username"]
    role = data["role"]

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO users (username, role) VALUES (?, ?)",
        (username, role)
    )

    conn.commit()
    conn.close()

    return jsonify({"role": role})

# ---------- VENDOR POSTS FOOD ----------
@app.route("/add-food", methods=["POST"])
def add_food():
    data = request.json

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO surplus_food (vendor_name, food_name, quantity, location, pickup_time)
        VALUES (?, ?, ?, ?, ?)
    """, (
        data["vendor_name"],
        data["food_name"],
        data["quantity"],
        data["location"],
        data["pickup_time"]
    ))

    conn.commit()
    conn.close()

    return jsonify({"message": "Food posted successfully"})

# ---------- CHARITY VIEWS FOOD ----------
@app.route("/food-list", methods=["GET"])
def food_list():
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM surplus_food")
    rows = cursor.fetchall()

    conn.close()

    food_items = []
    for row in rows:
        food_items.append({
            "id": row[0],
            "vendor_name": row[1],
            "food_name": row[2],
            "quantity": row[3],
            "location": row[4],
            "pickup_time": row[5]
        })

    return jsonify(food_items)

if __name__ == "__main__":
    app.run(debug=True)
