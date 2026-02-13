import re
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load NLP model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    # If not found, we'll need to download it or use a simpler tokenizer
    nlp = None

class MatchingEngine:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def preprocess_text(self, text):
        """Basic text cleaning and normalization."""
        if not text:
            return ""
        text = text.lower()
        # Remove special characters and numbers
        text = re.sub(r'[^a-zA-Z\s]', ' ', text)
        # Tokenize and lemmatize if spacy is available
        if nlp:
            doc = nlp(text)
            tokens = [token.lemma_ for token in doc if not token.is_stop]
            return " ".join(tokens)
        return text

    def calculate_match_score(self, resume_text, job_description):
        """Calculate similarity score using TF-IDF and Cosine Similarity."""
        processed_resume = self.preprocess_text(resume_text)
        processed_job = self.preprocess_text(job_description)
        
        tfidf_matrix = self.vectorizer.fit_transform([processed_resume, processed_job])
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
        
        return round(float(similarity[0][0]) * 100, 2)

    def extract_skills(self, text):
        """Extract keywords from text using NLP-based simple extraction."""
        if not text or not nlp:
            return []
        
        doc = nlp(text)
        # Simple extraction of Nouns and Proper Nouns as potential skills
        skills = {token.text.lower() for token in doc if token.pos_ in ["NOUN", "PROPN"] and len(token.text) > 1}
        return list(skills)

    def compare_skills(self, resume_skills, job_skills):
        """Identify missing skills."""
        resume_set = set([s.lower() for s in resume_skills])
        job_set = set([s.lower() for s in job_skills])
        
        matched = resume_set.intersection(job_set)
        missing = job_set - resume_set
        
        # Generate simple tailoring advice for missing skills
        advice = []
        for skill in list(missing)[:5]:  # Limit to top 5 missing skills
            advice.append(f"• Highlight any past projects where you used {skill.upper()} or similar tools.")
        
        if missing:
            advice.append("• Consider adding a 'Technical Proficiencies' section if you haven't already.")
        
        return {
            "matched": list(matched),
            "missing": list(missing),
            "tailoring_advice": advice
        }
