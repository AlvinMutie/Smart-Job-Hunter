# 🗺️ Smart Job Hunter - System Road Map

Based on my analysis of the current system, here is what has been implemented and what remains to be done to achieve a high-performance career platform.

## ✅ Currently Implemented
- **User Authentication**: Registration, Login, and JWT session management.
- **Profile System**: Profile completion tracking and basic info storage.
- **Resume Processing**: Uploading PDF/TXT and basic text extraction using PyMuPDF.
- **AI Matching Engine**: TF-IDF and Cosine Similarity calculation for resume-to-job matching.
- **Job Service**: Filtering logic for jobs (currently using mock data).
- **Application Tracker**: Backend and Frontend for tracking job application status.
- **Modern UI**: Dark-mode glassmorphism theme using Tailwind CSS and Framer Motion.

---

## 🚀 Remaining & Recommended Enhancements

### 1. 📂 Persistent Job Database (High Priority)
The current `JobService` uses mock data in memory.
- **Goal**: Move jobs to the SQLite database.
- **Action**: Update `app/services/job_service.py` to query the `jobs` table in `models.py`.

### 2. 🧠 Advanced NLP Skill Extraction
The current skill extraction is a simple Noun/Proper Noun filter.
- **Goal**: Improve precision using a dedicated skill library or LLM.
- **Action**: Integrate a library like `skill-network` or use OpenAI/Anthropic APIs for more accurate skill extraction.

### 3. 📊 Search & Analytics Dashboard
The dashboard currently only shows personal info and recent jobs.
- **Goal**: Add "Success Metrics".
- **Action**: Implement frontend charts (e.g., using `recharts`) to show match score trends and application success rates.

### 4. 📄 CV Optimization Engine
- **Goal**: Auto-generate suggested changes to the resume text.
- **Action**: Create a new service that takes "Missing Skills" and suggests specific bullet points for the user to add to their CV.

### 5. 📧 Email Notifications
- **Goal**: Alert users when a new 90%+ match is found.
- **Action**: Integrate `FastAPI-Mail` or a service like SendGrid to trigger daily match alerts.

---

## 🛠️ Maintenance & Dev Experience
- **Tailwind Linting**: I have added `.vscode/settings.json` to silence the CSS warnings.
- **Environment**: Ensure `spacy` model `en_core_web_sm` is always downloaded in the deployment pipeline.

*Keep hunting!* 🎯
