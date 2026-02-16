import sqlite3
import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.services.matching_engine import MatchingEngine

engine = MatchingEngine()

def calculate_match_score(resume_text, job_description):
    return engine.calculate_match_score(resume_text, job_description)

def verify():
    conn = sqlite3.connect('job_hunter_v3.db')
    cur = conn.cursor()
    
    # Get user 1's resume
    cur.execute("SELECT resume_text FROM profiles WHERE user_id = 1")
    res = cur.fetchone()
    resume_text = res[0] if res else None
    
    if not resume_text:
        print("ERROR: User 1 has no resume text in database.")
        return

    print(f"User 1 Resume Length: {len(resume_text)}")
    resume_skills = engine.extract_skills(resume_text)
    print(f"Resume Skills Extracted: {resume_skills}")
    print(f"Resume Preview: {resume_text[:200]}...")
    
    # Get all jobs
    cur.execute("SELECT id, title, description, skills_required FROM jobs")
    jobs = cur.fetchall()
    
    print("\n--- Match Results ---")
    for job_id, title, desc, skills in jobs:
        # Combined content as in main.py
        job_content = f"{skills} {desc}"
        
        score = engine.calculate_match_score(resume_text, job_content)
        resume_skills = engine.extract_skills(resume_text)
        job_skills = engine.extract_skills(desc)
        matches = set(resume_skills).intersection(set(job_skills))
        print(f"Job ID {job_id}: {title} -> {score}%")
        print(f"  Overlap: {list(matches)}")
        print(f"  Missing: {[s for s in job_skills if s not in resume_skills]}")
    
    conn.close()

if __name__ == "__main__":
    verify()
