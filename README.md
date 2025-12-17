# Fresh-Share Network

A Hyperlocal Food Waste Exchange Platform designed to reduce food waste by connecting local food vendors with nearby charities and individuals.

## Features
- Vendors post surplus food in real time
- Nearby users can view available food
- Simple, clean interface
- REST API backend

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Python (Flask)
- Database: SQLite

## How to Run
1. Install Python
2. Install dependencies:
   pip install -r backend/requirements.txt
3. Run backend:
   python backend/app.py
4. Open frontend/index.html in browser

## Technology Stack

Frontend: HTML, CSS, JavaScript 

Backend: Python (Flask)

Database: SQLite (lightweight and embedded)

Version Control: Git (GitHub)

Containerization: Docker (optional)
Testing: Manual test cases + Postman for API testing

giIDE: VS Code

## Software Design Approach

Using Layered & Modular Architecture:

Presentation Layer (Frontend): Handles UI and user interactions (login.html, vendor.html, charity.html, script.js, style.css).

Application/Logic Layer (Backend): Flask routes handle login, posting food, and fetching food lists (app.py).

Data Layer (Database): SQLite stores users and surplus food records (users and surplus_food tables).

UML / Diagrams for documentation:

Activity Diagram: Flow of posting and claiming food

Data Flow Diagram: Shows vendor → backend → DB → charity flow

Sequence Diagram: Vendor posts food → backend → DB → confirmation 

## Project Structure
FreshShare-Platform/
├── frontend/
│   ├── login.html
│   ├── vendor.html
│   ├── charity.html
│   ├── script.js
│   └── style.css
├── backend/
│   └── app.py
├── database.db          # SQLite database
├── docker/              # Optional Docker configuration
├── tests/               # Test cases (manual/Postman)
├── .gitignore
└── README.md

## Version Control with Git & GitHub

This project uses Git for version control and GitHub to host the repository. Follow these steps to manage your code efficiently.

1️⃣ Initial Setup

Clone the repository:
```bash
git clone https://github.com/yourusername/fresh-share-platform.git
cd fresh-share-platform
```

Initialize a local Git repository (if starting a new project):
```bash
git init
```

## 2️⃣Checking Status

Check which files are changed, added, or deleted:
```bash
git status
```

## 3️⃣Staging Changes

Add files you want to include in the next commit:
```bash
# Add a single file
git add README.md

# Add all files
git add .
```

## 4️⃣Committing Changes

Save your changes locally with a clear message:
```bash
git commit -m "Update README.md with setup instructions"
``` 
Tips for commit messages:

Use short, descriptive messages.

Example: "Add vendor dashboard feature" or "Fix charity page display"

## 5️⃣Pushing to GitHub

Send your committed changes to GitHub:
```bash
git push origin main
```

Replace main with your branch name if different.

## 6️⃣Updating README or Any File

Modify your file locally (README.md, code files, etc.)

Stage the file:
```bash
git add README.md
```

Commit the change:
```bash
git commit -m "Update README with Git usage instructions"
```

Push to GitHub:
```bash
git push origin main
```

✅ Your changes will now appear on GitHub.

## 7️⃣Viewing Changes

Check the GitHub repository in your browser to verify updates.

Use git log locally to view all commit history:
```bash
git log
```

## 8️⃣Best Practices

Make frequent commits with meaningful messages.

Use branches for new features (optional but recommended):
```bash
git checkout -b new-feature
```

Merge to main branch after testing:
```bash
git checkout main
git merge new-feature
git push origin main
```

## Testing Plan

To ensure the Fresh-Share platform works as intended, we performed a series of manual and API-based tests. Key tests include:

Role-Based Login: Vendors and Charities are redirected to their respective dashboards, with usernames stored dynamically for personalization.

Food Posting Workflow: Vendors can post surplus food items with validation for all required fields; the system prevents incomplete submissions.

Charity Dashboard Display: All posted food items appear correctly with vendor names, quantities, locations, and pickup times, and updates automatically via an observer-like refresh mechanism.

Backend API Validation: Endpoints such as /login and /add-food return expected JSON responses and persist data in the SQLite database.

Frontend Verification: Pages are visually clean, inputs aligned, buttons functional, and hover effects applied.

Error Handling: Alerts and messages display when fields are missing or the backend is unreachable.

Additional checks include cross-browser verification, role-based access testing, and basic stress tests to confirm the system remains responsive under multiple submissions. These tests ensure reliability, usability, and correctness of the application for end users.

## API Testing 
 Example: Test /add-food Endpoint
 ```bash
 POST http://127.0.0.1:5000/add-food
Content-Type: application/json

{
  "vendor_name": "Alice",
  "food_name": "Bread",
  "quantity": "10",
  "location": "Downtown",
  "pickup_time": "3 PM"
}
```

## Test /login Endpoint
```bash
POST http://127.0.0.1:5000/login
Content-Type: application/json

{
  "username": "Alice",
  "role": "vendor"
}
```