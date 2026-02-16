from sqlalchemy.orm import Session
from app.database import SessionLocal, init_db
from app.models.models import Job
from datetime import datetime

def seed_jobs():
    init_db()
    db = SessionLocal()
    
    # Mock data from job_service.py
    mock_jobs = [
        {
            "title": "Senior Python Developer",
            "company": "TechCorp",
            "location": "New York, NY",
            "description": "We are looking for a Senior Python Developer with experience in FastAPI, PostgreSQL, and AWS.",
            "remote_status": "Remote",
            "experience_level": "Senior",
            "skills_required": "Python, FastAPI, PostgreSQL, AWS",
            "salary_range": "$120k - $160k",
            "posted_at": datetime.now()
        },
        {
            "title": "React Frontend Engineer",
            "company": "DesignSync",
            "location": "San Francisco, CA",
            "description": "Join our team to build beautiful user interfaces with React, Tailwind CSS, and Framer Motion.",
            "remote_status": "Hybrid",
            "experience_level": "Mid-Level",
            "skills_required": "React, Tailwind, CSS, JavaScript",
            "salary_range": "$100k - $140k",
            "posted_at": datetime.now()
        },
        {
            "title": "Data Scientist",
            "company": "DataInsights",
            "location": "Remote",
            "description": "Looking for a Data Scientist to build predictive models using scikit-learn and spaCy.",
            "remote_status": "Remote",
            "experience_level": "Mid-Level",
            "skills_required": "Python, scikit-learn, spaCy, NLTK",
            "salary_range": "$110k - $150k",
            "posted_at": datetime.now()
        },
        {
            "title": "Junior Go Developer",
            "company": "CloudNative",
            "location": "Austin, TX",
            "description": "Great opportunity for a Junior developer to learn Go and Kubernetes.",
            "remote_status": "On-site",
            "experience_level": "Junior",
            "skills_required": "Go, Docker, Linux",
            "salary_range": "$70k - $90k",
            "posted_at": datetime.now()
        }
    ]

    for job_data in mock_jobs:
        # Check if already exists to avoid duplicates
        existing = db.query(Job).filter(Job.title == job_data["title"], Job.company == job_data["company"]).first()
        if not existing:
            job = Job(**job_data)
            db.add(job)
    
    db.commit()
    db.close()
    print("Database seeded with mock jobs!")

if __name__ == "__main__":
    seed_jobs()
