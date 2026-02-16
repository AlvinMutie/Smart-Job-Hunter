from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.models import Job

class JobService:
    async def get_jobs(self, 
                       db: Session,
                       location: Optional[str] = None, 
                       remote_status: Optional[str] = None, 
                       experience_level: Optional[str] = None,
                       keywords: Optional[str] = None) -> List[Job]:
        """Fetch jobs from database with filters."""
        query = db.query(Job)
        
        if location:
            # If user searches 'Remote', check both location and remote_status
            if location.lower() == 'remote':
                query = query.filter(or_(
                    Job.location.ilike(f"%{location}%"),
                    Job.remote_status == 'Remote'
                ))
            else:
                query = query.filter(Job.location.ilike(f"%{location}%"))
        
        if remote_status:
            query = query.filter(Job.remote_status == remote_status)
            
        if experience_level:
            query = query.filter(Job.experience_level == experience_level)
            
        if keywords:
            keyword_list = [k.strip().lower() for k in keywords.split(",")]
            filters = []
            for kw in keyword_list:
                kw_filter = f"%{kw}%"
                filters.append(Job.title.ilike(kw_filter))
                filters.append(Job.description.ilike(kw_filter))
                filters.append(Job.skills_required.ilike(kw_filter))
            query = query.filter(or_(*filters))
            
        return query.order_by(Job.posted_at.desc()).all()

    async def get_job_by_id(self, db: Session, job_id: int) -> Optional[Job]:
        return db.query(Job).filter(Job.id == job_id).first()

job_service = JobService()
