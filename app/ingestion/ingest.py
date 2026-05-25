import os
from pathlib import Path
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import PGVector
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
LAWS_DIR = Path("data/laws")

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

def extract_text_from_pdf(pdf_path: Path) -> str:
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text

def ingest_documents():
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=["\n\n", "\n", ".", " "]
    )

    all_chunks = []
    all_metadatas = []

    for pdf_file in LAWS_DIR.glob("*.pdf"):
        print(f"Processing: {pdf_file.name}")
        
        raw_text = extract_text_from_pdf(pdf_file)
        chunks = text_splitter.split_text(raw_text)
        
        metadatas = [{"source": pdf_file.name, "law": pdf_file.stem} for _ in chunks]
        
        all_chunks.extend(chunks)
        all_metadatas.extend(metadatas)
        print(f"  → {len(chunks)} chunks created")

    print(f"\nTotal chunks: {len(all_chunks)}")
    print("Embedding and storing in PostgreSQL...")

    vectorstore = PGVector.from_texts(
        texts=all_chunks,
        embedding=embeddings,
        metadatas=all_metadatas,
        connection=DATABASE_URL,
        collection_name="kenyan_laws"
    )

    print("✅ Done! All documents embedded and stored.")
    return vectorstore

if __name__ == "__main__":
    ingest_documents()