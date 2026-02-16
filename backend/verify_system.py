from app.database import SessionLocal
from app.services.job_service import job_service
from app.services.matching_engine import MatchingEngine
import asyncio

async def test_all():
    db = SessionLocal()
    engine = MatchingEngine()
    
    print("--- Testing Database Persistence ---")
    jobs = await job_service.get_jobs(db)
    print(f"Total jobs: {len(jobs)}")
    for j in jobs:
        print(f" - {j.title} at {j.company}")

    print("\n--- Testing Filtering (Python) ---")
    python_jobs = await job_service.get_jobs(db, keywords="Python")
    print(f"Python jobs: {len(python_jobs)}")
    for j in python_jobs:
        print(f" - {j.title}")

    print("\n--- Testing Matching Engine ---")
    resume = "I am a Senior Python Developer with experience in FastAPI and AWS."
    job_desc = jobs[0].description
    score = engine.calculate_match_score(resume, job_desc)
    skills = engine.extract_skills(resume)
    comparison = engine.compare_skills(skills, engine.extract_skills(job_desc))
    
    print(f"Match Score: {score}%")
    print(f"Extracted Skills: {skills}")
    print(f"Missing from job: {comparison['missing']}")

    db.close()

if __name__ == "__main__":
    asyncio.run(test_all())
