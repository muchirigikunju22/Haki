# Haki — Know Your Rights in Kenya

> Plain-language legal guidance grounded in the Kenya Constitution and Kenyan law. Free. Private. Instant.

![Haki Screenshot](./docs/screenshot.png)

---

## What is Haki?

Haki is a legal rights platform for Kenyan citizens. Most people don't know their rights — not because they don't care, but because the law is written in complex language that's hard to understand. Haki bridges that gap.

You describe your situation in plain English or Swahili. Haki searches actual Kenyan legal documents and tells you:

- What your rights are in that situation
- What to do right now, step by step
- What evidence to preserve
- Where to get help
- Which specific law applies, cited by Act and Section

**Current niche:** Police encounters and arrests (roadblocks, detention, brutality, unlawful stops)

---

## The Problem It Solves

- Citizens pay bribes at roadblocks not knowing the stop is unlawful
- People get arrested without being told why — a violation of Article 49
- Survivors destroy evidence before reporting because no one told them not to
- Lawyers exploit clients who don't understand the law
- Vulnerable people don't know where to report or what their rights are

---

## How It Works

```
User describes situation
        ↓
RAG pipeline searches indexed Kenyan legal documents
        ↓
Retrieves most relevant legal text chunks (k=8)
        ↓
LLM generates grounded response — only from retrieved text
        ↓
Every answer cites the specific Act and Section
        ↓
Response displayed in plain language with evidence guidance
```

The AI **only** answers from the indexed legal documents. If the answer isn't in the documents, it says so and refers the user to a lawyer or IPOA.

---

## Legal Documents Indexed

| Document | Coverage |
|---|---|
| Constitution of Kenya 2010 | Articles 49, 50, 51 — arrest rights, fair trial, detention |
| National Police Service Act 2011 | Police conduct, powers, obligations |
| Criminal Procedure Code Cap 75 | Lawful arrest, bail, warrants, 24-hour rule |
| Traffic Act Cap 403 | Roadblocks, vehicle stops, traffic offences |
| Penal Code Cap 63 | Criminal offences — what is and isn't illegal |
| IPOA Act 2011 | How to file complaints against police |
| Prevention of Torture Act 2017 | Rights against brutality and inhumane treatment |
| Bail and Bond Policy Guidelines 2015 | Bail rights, police bond obligations |

---

## Tech Stack

### Backend
- **Python** + **FastAPI** — REST API
- **LangChain** + **pgvector** — RAG pipeline
- **sentence-transformers** (`all-MiniLM-L6-v2`) — document embeddings
- **PostgreSQL** — vector storage
- **Groq API** (`llama-3.3-70b-versatile`) — LLM for response generation

### Frontend
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**
- **Tabler Icons**

---

## Project Structure

```
haki/
├── haki-api/                    # Python FastAPI backend
│   ├── app/
│   │   ├── ingestion/
│   │   │   └── ingest.py        # PDF processing, chunking, embedding
│   │   ├── retrieval/
│   │   │   └── query.py         # RAG query + Groq response generation
│   │   └── api/
│   │       └── main.py          # FastAPI endpoints
│   ├── data/
│   │   └── laws/                # Kenyan legal PDFs (not committed)
│   ├── .env
│   └── requirements.txt
│
└── haki-frontend/               # Next.js frontend
    ├── app/
    │   ├── page.tsx             # Main page, state management
    │   └── layout.tsx           # Root layout
    ├── components/
    │   ├── Sidebar.tsx
    │   ├── HomeView.tsx
    │   ├── ChatView.tsx
    │   ├── UserMessage.tsx
    │   ├── HakiMessage.tsx
    │   ├── AdviceCards.tsx
    │   └── InputBar.tsx
    ├── lib/
    │   ├── api.ts               # API call functions
    │   └── parseAdvice.ts       # Parses LLM response into sections
    └── types/
        └── index.ts
```

---

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL with pgvector extension
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Backend Setup

```bash
cd haki-api

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your keys
```

**.env**
```env
GROQ_API_KEY=your_groq_key_here
DATABASE_URL=postgresql://postgres:password@localhost:5432/haki_db
```

**Set up PostgreSQL**
```bash
# Create database
psql -U postgres -c "CREATE DATABASE haki_db;"
psql -U postgres -d haki_db -c "CREATE EXTENSION vector;"
```

**Ingest legal documents**
```bash
# Place your PDF files in data/laws/
python app/ingestion/ingest.py
```

**Run the API**
```bash
uvicorn app.api.main:app --reload
# API runs at http://localhost:8000
# Interactive docs at http://localhost:8000/docs
```

### Frontend Setup

```bash
cd haki-frontend

npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local
```

**.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

```bash
npm run dev
# Frontend runs at http://localhost:3000
```

---

## API Endpoints

### `POST /ask`
Submit a legal scenario and receive grounded advice.

**Request**
```json
{
  "scenario": "A police officer stopped me at a roadblock and is demanding 500 shillings",
  "language": "english"
}
```

**Response**
```json
{
  "advice": "1. YOUR RIGHTS IN THIS SITUATION\n...",
  "sources": ["Traffic Act", "IPOA Act"],
  "disclaimer": "This is legal information based on Kenyan law...",
  "response_time_ms": 1826.2
}
```

### `GET /health`
Health check.

---

## Important Disclaimers

- Haki provides **legal information**, not legal advice
- It is not a substitute for professional legal representation
- Every response cites the specific Kenyan law it is based on
- If the answer is not found in the indexed documents, Haki says so
- **Emergency contacts always available:** 999 (Police) · IPOA: 0800 720 990 · Legal Aid: 0800 720 903

---

## Roadmap

- [x] Police encounters and arrests niche
- [x] RAG pipeline with Kenyan legal documents
- [x] FastAPI backend with citation-grounded responses
- [x] Next.js frontend — ChatGPT-style dark UI
- [ ] WhatsApp bot via Africa's Talking
- [ ] Swahili language support
- [ ] GBV (Gender Based Violence) niche
- [ ] Employment rights niche
- [ ] Landlord-tenant rights niche
- [ ] Voice note support
- [ ] Resource directory by county

---

## Partners & Resources

- [Kenya Law](https://kenyalaw.org) — source of all legal documents
- [IPOA](https://ipoa.go.ke) — Independent Policing Oversight Authority
- [FIDA Kenya](https://fidakenya.org) — Federation of Women Lawyers
- [Kituo Cha Sheria](https://kituochasheria.or.ke) — Free legal aid: 0800 720 903

---

## Contributing

This project is built to serve Kenyan citizens. Contributions welcome — especially:
- Legal document review and accuracy checking
- Swahili translations
- New niche modules (GBV, employment, landlord-tenant)
- Mobile app development

---

## License

MIT License — see [LICENSE](./LICENSE)

---

*Haki means "rights" in Swahili.*
