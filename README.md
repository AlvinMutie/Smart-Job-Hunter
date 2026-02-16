# 🎯 Smart Job Hunter (Hunter.io)

![Version](https://img.shields.io/badge/version-2.1.0-indigo?style=for-the-badge&logo=git) ![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge&logo=activity) ![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge) ![Python](https://img.shields.io/badge/python-3.10+-yellow?style=for-the-badge&logo=python&logoColor=white) ![React](https://img.shields.io/badge/react-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)

> **Stop Applying Blindly. Hunt Smarter.**
> The AI-powered career acceleration platform that combines **70% Tech Skill Overlap** with **30% Contextual Similarity** to match you with your dream job.

![Dashboard Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2670)

## 🚀 Overview

**Smart Job Hunter** eliminates the guesswork from your job search. Unlike standard job boards that rely on basic keyword matching, our **Hybrid Matching Engine** analyzes the semantic context of your resume against thousands of job descriptions. We identify *exactly* why you're a fit—and more importantly, why you aren't.

### Core Capabilities

- **🧠 Hybrid Matching Engine**: Uses TF-IDF vectorization and cosine similarity to calculate a precise 0-100% match score. Handles tech aliases (e.g., "JS" = "JavaScript") automatically.
- **📄 AI Gap Analysis**: Instantly visualizes missing skills. If a job requires "Docker" and you don't list it, we tell you immediately.
- **📋 Kanban Pipeline Tracker**: A Trello-style board to track applications from *Not Applied* → *Interview* → *Offer*.
- **💎 Premium UX**: Features a stunning Material 3 Dark Mode interface with smooth scrolling (`Lenis`), spotlight hover effects, and 3D visualizations.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS + Custom Animations
- **Motion**: Framer Motion (Scroll Reveals, Hero Animations)
- **Icons**: Lucide React
- **UX Polish**: Lenis (Smooth Scroll), Glassmorphism components

### Backend (Server)
- **API**: FastAPI (High-performance Python framework)
- **AI/ML**: `scikit-learn` (TF-IDF), `spacy` (NLP Entity Extraction)
- **Database**: SQLAlchemy (ORM) + SQLite (Dev)
- **PDF Parsing**: PyMuPDF (`fitz`) for high-fidelity resume extraction
- **Auth**: JWT (JSON Web Tokens) with Password Hashing (`bcrypt`)

---

## 🚦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- **Python** 3.10+
- **Node.js** 18+
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/AlvinMutie/Smart-Job-Hunter.git
cd Smart-Job-Hunter
```

### 2. Backend Setup
Initialize the Python environment and install dependencies.

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
.\venv\Scripts\activate
# Activate (Mac/Linux)
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download NLP model
python -m spacy download en_core_web_sm

# Start the API Server
python -m app.main
```
*The backend runs on `http://localhost:8000`*

### 3. Frontend Setup
Install and run the React application.

```bash
cd frontend

# Install packages
npm install

# Start Development Server
npm run dev
```
*The frontend runs on `http://localhost:5173`*

---

## 📂 Project Structure

```text
Smart-Job-Hunter/
├── backend/
│   ├── app/
│   │   ├── services/      # AI Logic (matching_service.py, resume_parser.py)
│   │   ├── models/        # Database Schemas (User, Job, Application)
│   │   └── routers/       # API Endpoints (Auth, Jobs, Upload)
│   ├── job_hunter_v3.db   # SQLite Database
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/    # Reusable UI (SpotlightCard, BentoGrid)
    │   ├── pages/         # Landing, Dashboard, Tracker
    │   ├── services/      # Axios API definition
    │   └── assets/        # Images & Fonts
    └── package.json
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Built with ❤️ by <b>Hunter.io Team</b></p>
  <p><i>Stop applying. Start hunting.</i></p>
</div>
