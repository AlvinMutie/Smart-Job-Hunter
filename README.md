# 🎯 Smart Job Hunter (Hunter.io)

**Smart Job Hunter** is a high-performance career acceleration platform designed to eliminate "blind applications" by using AI-driven analytics. It perfectly bridges the gap between job seekers and their ideal roles through data-driven matching and automated CV optimization.

![Hunter.io Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426)

## 🚀 Key Features

### 🧠 AI-Powered Matching Engine
- **TF-IDF & Cosine Similarity**: Custom algorithm that mathematically compares your profile against job descriptions for high-precision matching.
- **Skill Gap Analysis**: Instantly identifies missing keywords in your resume.
- **Tailoring Advice**: Provides actionable tips for every job to help you bridge technical gaps and land interviews.

### 📄 Automated CV Hub
- **Zero-Input Parsing**: Backend support for PDF and TXT extraction—just upload your resume and let the AI do the work.
- **Smart Memory**: Your profile learns from your CV over time, providing personalized recommendations across the platform.

### 📑 Professional Pipeline Tracker
- **Application Workflow**: Manage your job hunt from "Not Applied" to "Offer Received."
- **Unified Analytics**: See your average match scores and application conversion rates in one place.

### 💎 Premium Design System
- **Modern Glassmorphism UI**: High-end aesthetic with backdrop blurs, deep gradients, and sleek animations.
- **Responsive Dashboard**: Personalized experience that adapts to your career preferences.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: FastAPI (Python), SQLAlchemy, PyMuPDF (fitz), scikit-learn.
- **Database**: SQLite (Version 3) for robust local development.
- **Auth**: JWT (JSON Web Tokens) with secure Password Hashing.

---

## 🚦 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Install deps
pip install -r requirements.txt
python -m spacy download en_core_web_sm
# Run server
python -m app.main
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:3000` to start your hunt.

---

## 📂 Project Structure
```text
Jobscrp/
├── backend/
│   ├── app/
│   │   ├── services/      # AI Matching & Processing logic
│   │   ├── models/        # Data Structures
│   │   └── main.py        # API Gateway
│   └── job_hunter_v3.db   # Latest stable DB
└── frontend/
    ├── src/
    │   ├── pages/         # Dashboard, Matches, Tracker
    │   └── services/      # API Interceptors
```

---

## ⚖️ License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with ❤️ for talented developers.*
