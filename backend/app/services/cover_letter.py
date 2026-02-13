class CoverLetterGenerator:
    def generate(self, job_title, company, job_description, candidate_name, candidate_skills):
        """Generate a tailored cover letter."""
        template = f"""
Dear Hiring Manager at {company},

I am writing to express my strong interest in the {job_title} position. With my background in {', '.join(candidate_skills[:3])}, I am confident that I can contribute significantly to your team.

I was particularly drawn to this role because of the opportunity to work on {job_description[:100]}... [truncated for brevity].

My experience includes building robust applications and solving complex problems. My skills in {', '.join(candidate_skills)} align well with the requirements of {job_title}.

Thank you for your time and consideration.

Best regards,
{candidate_name}
"""
        return template.strip()

cover_letter_generator = CoverLetterGenerator()
