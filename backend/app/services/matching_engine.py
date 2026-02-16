import re
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load NLP model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    nlp = None

# A predefined list of common technical skills to improve extraction accuracy
TECH_SKILLS_DB = {
    "python", "javascript", "typescript", "java", "c++", "c#", "go", "rust", "php", "ruby", "swift", "kotlin",
    "react", "vue", "angular", "next.js", "node.js", "express", "fastapi", "flask", "django", "laravel", "spring",
    "postgresql", "mysql", "mongodb", "redis", "dynamodb", "sqlite", "oracle",
    "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "jenkins", "ansible", "ci/cd",
    "machine learning", "deep learning", "nlp", "data science", "pytorch", "tensorflow", "scikit-learn", "pandas", "numpy",
    "rest api", "graphql", "grpc", "microservices", "serverless",
    "html", "css", "tailwind", "sass", "bootstrap", "figma", "framer motion",
    "git", "linux", "bash", "agile", "scrum", "jira"
}

class MatchingEngine:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def normalize_spaced_text(self, text):
        """Detect and fix text that has been extracted with spaces between every letter, line by line."""
        if not text:
            return ""
            
        lines = text.split('\n')
        normalized_lines = []
        
        for line in lines:
            words = line.split()
            if len(words) >= 3:
                single_char_words = [w for w in words if len(w) == 1]
                if len(single_char_words) / len(words) > 0.7:
                    # This line is spaced. Join it but keep double spaces as word markers
                    # Step 1: Replace multi-spaces with a "||" marker
                    marker = "||"
                    line_with_marker = re.sub(r'\s{2,}', marker, line)
                    
                    segments = line_with_marker.split(marker)
                    norm_segments = ["".join(s.split()) for s in segments]
                    normalized_lines.append(" ".join(norm_segments))
                    continue
            normalized_lines.append(line)
            
        return "\n".join(normalized_lines)

    def preprocess_text(self, text):
        """Basic text cleaning and normalization."""
        if not text:
            return ""
        
        # Normalize spaced out characters line by line
        text = self.normalize_spaced_text(text)
        
        text = text.lower()
        # Keep ++ and # for C++ and C#
        text = re.sub(r'[^a-z0-9\s\#\+]', ' ', text)
        
        if nlp:
            doc = nlp(text)
            tokens = [token.lemma_ for token in doc if not token.is_stop]
            return " ".join(tokens)
        return text

    def calculate_match_score(self, resume_text, job_description):
        """Calculate similarity score using a hybrid of TF-IDF and Skill Match."""
        processed_resume = self.preprocess_text(resume_text)
        processed_job = self.preprocess_text(job_description)
        
        # 1. Content Similarity (TF-IDF)
        try:
            tfidf_matrix = self.vectorizer.fit_transform([processed_resume, processed_job])
            content_similarity = float(cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0])
        except:
            content_similarity = 0.0
            
        # 2. Skill Match
        resume_skills = set(self.extract_skills(resume_text))
        job_skills = set(self.extract_skills(job_description))
        
        if not job_skills:
            skill_score = content_similarity
        else:
            matches = resume_skills.intersection(job_skills)
            skill_score = len(matches) / len(job_skills)
            
        # 3. Hybrid Calculation (60% Skill Match + 40% Context)
        # We boost the score to be more "user friendly" (avoiding 4% results)
        final_score = (skill_score * 0.7) + (content_similarity * 0.3)
        
        # Apply a non-linear boost for low scores to ensure they show up in recommendations
        # if there is at least some content overlap
        if final_score > 0:
            final_score = max(final_score, content_similarity * 2) 
            
        return round(final_score * 100, 2)

    def extract_skills(self, text):
        """Extract keywords from text using dictionary-based matching and NLP."""
        if not text:
            return []
        
        # Normalize and clean text for extraction
        text = self.normalize_spaced_text(text)
        text_lower = text.lower()
        found_skills = set()
        
        # 1. Dictionary-based matching (High precision for tech stack)
        # We also handle some common aliases
        aliases = {
            "postgres": "postgresql",
            "postgremsql": "postgresql",
            "sql server": "mssql",
            "mongodb": "mongo",
            "react.js": "react",
            "node": "node.js",
            "js": "javascript",
            "ts": "typescript",
            "full stack": "fullstack",
            "frontend": "front-end",
            "backend": "back-end"
        }
        
        # Add a few more common ones to DB if they were missing
        extra_skills = {"java", "spring boot", "django", "express", "tailwind css", "bootstrap", "flutter", "react native", "aws s3", "aws lambda", "azure", "google cloud"}
        local_db = TECH_SKILLS_DB.union(extra_skills)
        
        for skill in local_db:
            if re.search(r'\b' + re.escape(skill) + r'\b', text_lower):
                found_skills.add(skill)
        
        for alias, target in aliases.items():
            if re.search(r'\b' + re.escape(alias) + r'\b', text_lower):
                found_skills.add(target)
        
        # 2. NLP-based extraction (For catching nouns/proper nouns not in DB)
        # Avoid generic terms that dilute the score
        generic_terms = {"experience", "team", "project", "developer", "engineer", "software", "solution", "customer", "business", "data", "system", "role", "work"}
        
        if nlp:
            doc = nlp(text)
            for token in doc:
                # Proper nouns are often technologies
                if token.pos_ in ["PROPN"] and len(token.text) > 2:
                    val = token.text.lower()
                    if val not in found_skills and val not in generic_terms:
                        found_skills.add(val)
                # Nouns only if they are long enough and not generic
                elif token.pos_ in ["NOUN"] and len(token.text) > 3:
                     val = token.text.lower()
                     if val not in found_skills and val not in generic_terms:
                         # Still check if it looks technical (optional, maybe just keep PROPN)
                         pass
        
        return list(found_skills)

    def compare_skills(self, resume_skills, job_skills):
        """Identify missing skills and provide advice."""
        resume_set = set([s.lower() for s in resume_skills])
        job_set = set([s.lower() for s in job_skills])
        
        matched = resume_set.intersection(job_set)
        missing = job_set - resume_set
        
        # Generate simple tailoring advice for missing skills
        advice = []
        # Filter missing skills to prioritize tech skills
        tech_missing = [s for s in missing if s in TECH_SKILLS_DB]
        other_missing = [s for s in missing if s not in TECH_SKILLS_DB]
        
        sorted_missing = tech_missing + other_missing
        
        for skill in sorted_missing[:5]:
            advice.append(f"• Highlight any past projects where you used {skill.upper()} or similar tools.")
        
        if sorted_missing:
            advice.append("• Consider adding a 'Technical Proficiencies' section if you haven't already.")
        
        return {
            "matched": list(matched),
            "missing": list(sorted_missing),
            "tailoring_advice": advice
        }
