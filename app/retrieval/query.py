import os
from groq import Groq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_postgres.vectorstores import PGVector
from sqlalchemy import create_engine
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

def get_vectorstore():
    engine = create_engine(DATABASE_URL)
    return PGVector(
        embeddings=embeddings,
        collection_name="kenyan_laws",
        connection=engine,
    )

def query_legal_advice(scenario: str) -> dict:
    vectorstore = get_vectorstore()
    relevant_docs = vectorstore.similarity_search(scenario, k=8)

    context = ""
    sources = []
    for doc in relevant_docs:
        context += f"\n---\nSource: {doc.metadata.get('law', 'Unknown')}\n{doc.page_content}\n"
        sources.append(doc.metadata.get('law', 'Unknown'))

    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    system_prompt = """You are a Kenyan legal rights assistant specializing ONLY in police encounters, arrests, detention, and related situations.

STRICT RULES:
- ONLY answer using the legal document excerpts provided below
- ALWAYS cite the specific Act and section you are referencing
- If the situation is NOT related to police, arrests, detention, roadblocks, or police misconduct, respond EXACTLY with:
  "This question is outside my current scope. Haki currently covers police encounters and arrests only. For this situation, please consult a lawyer or contact Kituo Cha Sheria on 0800 720 903 (free legal aid)."
- If the answer is not found in the provided documents, say: "I cannot find this in the provided legal documents. Please consult a lawyer."
- Use plain simple English a non-lawyer can understand
- For urgent situations, lead with IMMEDIATE ACTIONS first
- Never give personal opinions, only what the law says

FORMAT your response as:
1. YOUR RIGHTS IN THIS SITUATION
2. WHAT TO DO RIGHT NOW (step by step)
3. WHAT EVIDENCE TO PRESERVE
4. WHERE TO GET HELP
5. LEGAL REFERENCES (cite the exact Act and section)"""

    user_message = f"""A Kenyan citizen describes this situation:
"{scenario}"

Answer based ONLY on these legal document excerpts:
{context}"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=1500,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]
    )

    return {
        "advice": response.choices[0].message.content,
        "sources": list(set(sources))
    }