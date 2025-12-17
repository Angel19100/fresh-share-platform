import sqlite3

def get_db():
    return sqlite3.connect("database.db")

def create_tables():
    conn = get_db()
    cursor = conn.cursor()

    # Users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        role TEXT
    )
    """)

    # Surplus food table
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
