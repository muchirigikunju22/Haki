from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.retrieval.query import query_legal_advice
import time

app = FastAPI(
    title="Haki API",
    description="Know Your Rights — Kenyan Legal Rights Assistant",
    version="1.0.0"
)

# Allow frontend and WhatsApp bot to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Lock this down to your domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScenarioRequest(BaseModel):
    scenario: str
    language: str = "english"  # english or swahili — multilingual coming later

class LegalAdviceResponse(BaseModel):
    advice: str
    sources: list[str]
    disclaimer: str
    response_time_ms: float

@app.get("/")
async def root():
    return {
        "service": "Haki API",
        "tagline": "Know Your Rights in Kenya",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/ask", response_model=LegalAdviceResponse)
async def ask_legal_question(request: ScenarioRequest):
    if not request.scenario.strip():
        raise HTTPException(status_code=400, detail="Scenario cannot be empty")

    if len(request.scenario) > 2000:
        raise HTTPException(status_code=400, detail="Scenario too long. Please keep it under 2000 characters")

    try:
        start = time.time()
        result = query_legal_advice(request.scenario)
        elapsed = (time.time() - start) * 1000

        return LegalAdviceResponse(
            advice=result["advice"],
            sources=result["sources"],
            disclaimer="This is legal information based on Kenyan law. It is not a substitute for professional legal advice. If you are in danger, call 999 or 0800 720 990 (IPOA hotline).",
            response_time_ms=round(elapsed, 2)
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

@app.post("/whatsapp")
async def whatsapp_webhook(request: ScenarioRequest):
    """
    Simplified endpoint for WhatsApp bot —
    returns shorter, plain text response
    """
    if not request.scenario.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    try:
        result = query_legal_advice(request.scenario)

        # Trim response for WhatsApp — keep it concise and screenshot-friendly
        short_advice = result["advice"][:1200] if len(result["advice"]) > 1200 else result["advice"]
        sources_text = ", ".join(result["sources"])

        return {
            "message": f"{short_advice}\n\n📚 Sources: {sources_text}\n\n⚠️ This is legal information, not legal advice. Call 999 if in danger.",
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))