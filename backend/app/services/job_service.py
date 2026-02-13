import asyncio
from typing import List, Optional
from datetime import datetime

class MockJobService:
    def __init__(self):
        self.mock_jobs = [
            {
                "id": 1,
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
                "id": 2,
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
                "id": 3,
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
                "id": 4,
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

    async def get_jobs(self, 
                       location: Optional[str] = None, 
                       remote_status: Optional[str] = None, 
                       experience_level: Optional[str] = None,
                       keywords: Optional[str] = None) -> List[dict]:
        """Fetch jobs from mock data with filters."""
        # In a real app, this would query the database
        filtered_jobs = self.mock_jobs
        
        if location:
            filtered_jobs = [j for j in filtered_jobs if location.lower() in j["location"].lower()]
        
        if remote_status:
            filtered_jobs = [j for j in filtered_jobs if j["remote_status"].lower() == remote_status.lower()]
            
        if experience_level:
            filtered_jobs = [j for j in filtered_jobs if j["experience_level"].lower() == experience_level.lower()]
            
        if keywords:
            keyword_list = [k.strip().lower() for k in keywords.split(",")]
            def matches_keywords(job):
                text = (job["title"] + " " + job["description"] + " " + job["skills_required"]).lower()
                return any(kw in text for kw in keyword_list)
            
            filtered_jobs = [j for j in filtered_jobs if matches_keywords(j)]
            
        return filtered_jobs

job_service = MockJobService()
