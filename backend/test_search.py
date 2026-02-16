import requests
import json

BASE_URL = "http://localhost:8000"

def test_search(keywords=None, location=None):
    params = {}
    if keywords: params['keywords'] = keywords
    if location: params['location'] = location
    
    print(f"\nTesting search with params: {params}")
    try:
        response = requests.get(f"{BASE_URL}/jobs", params=params)
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            jobs = response.json()
            print(f"Count: {len(jobs)}")
            for j in jobs:
                print(f" - {j['title']} ({j['location']})")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    # Test all
    test_search()
    # Test keywords
    test_search(keywords="Python")
    # Test location
    test_search(location="Remote")
    # Test mismatch
    test_search(keywords="NonExistent")
