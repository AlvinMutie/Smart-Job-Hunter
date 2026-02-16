import re

class TailorService:
    def generate_suggestions(self, resume_text, job_title, missing_skills):
        """
        Generates tailored bullet points or professional summary improvements 
        targeting missing skills.
        """
        if not missing_skills:
            return ["Your resume is already highly optimized for this role!"]

        suggestions = []
        
        # Structure the response as a "virtual LLM" would
        # In a real-world app, this would be an OpenAI/Anthropic API call
        
        # 1. Professional Summary Improvement
        suggestions.append({
            "section": "Professional Summary",
            "original_context": "Current profile focuses on general experience.",
            "suggestion": f"Integrate your knowledge of {', '.join(missing_skills[:2])} directly into your summary to pass ATS filters immediately.",
            "impact": "High - Targets initial screening"
        })

        # 2. Specific Skill-Based Bullet Points
        for skill in missing_skills[:3]:
            suggestions.append({
                "section": "Experience / Projects",
                "suggestion": self._generate_bullet_point(skill, job_title),
                "impact": "Medium - Demonstrates technical competency"
            })

        # 3. Strategy Advice
        suggestions.append({
            "section": "Strategic Advice",
            "suggestion": f"If you have used tools similar to {missing_skills[0].upper()}, mention them and explicitly state 'Quickly adapted to {missing_skills[0].upper()} paradigms' to show cross-functional capability.",
            "impact": "Soft Skill - Adaptability"
        })

        return suggestions

    def _generate_bullet_point(self, skill, job_title):
        """Mimics LLM bullet point generation logic."""
        skill_upper = skill.upper()
        scenarios = [
            f"Implemented {skill_upper} solutions to optimize data processing latency by 30% in high-concurrency environments.",
            f"Leveraged {skill_upper} for building scalable infrastructure components aligned with {job_title} requirements.",
            f"Collaborated on {skill_upper} integration within a CI/CD pipeline, improving deployment frequency by 15%.",
            f"Architected modular components using {skill_upper} to ensure code maintainability and cross-platform compatibility."
        ]
        # Simple hash-like selection for consistency based on skill name
        idx = sum(ord(c) for c in skill) % len(scenarios)
        return scenarios[idx]

tailor_service = TailorService()
