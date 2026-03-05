from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai

# Setup your Gemini API Key here
GOOGLE_API_KEY = "YOUR_GEMINI_API_KEY"
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

class JobOffer(BaseModel):
    text: str

@app.post("/scan")
async def scan_job(offer: JobOffer):
    prompt = f"""
    Act as a fraud detection expert. Analyze this job offer for scams.
    1. Give it a 'Trust Score' from 0% to 100%.
    2. Give a 1-sentence summary verdict (Safe, Suspicious, or Scam).
    3. List 2-3 bullet points explaining the red flags or green flags.
    
    Here is the offer text:
    {offer.text}
    """
    try:
        response = model.generate_content(prompt)
        return {"result": response.text}
    except Exception as e:
        return {"result": f"Error: {str(e)}"}