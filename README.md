# **Incorrupta: Decentralized Evidence Management System**  
**Immutable • Secure • Scalable**  

## **🚨 Overview**  
**Incorrupta** is a blockchain-inspired platform that prevents evidence tampering, enhances traceability, and secures law enforcement records. It leverages **IPFS, Supabase RLS, and OCR automation** to ensure data integrity, cryptographic auditing, and role-based access control.  

## **⚡ Key Features**  
- **Decentralized Storage** → IPFS-backed evidence with immutable CIDs.  
- **Role-Based Access** → Supabase JWT & RLS for police/admin/auditor permissions.  
- **Audit Logging** → Cryptographic timestamps ensure full traceability.  
- **Automated OCR** → Extracts structured data from legal documents (Aadhaar, Passport).  
- **Real-Time Search** → Fetch evidence records securely via Supabase.  

## **🛠 Tech Stack**  
- **Frontend:** React.js (TypeScript), Vite, Tailwind CSS, Lucide Icons  
- **Backend:** Node.js, Supabase (PostgreSQL + RLS), Pinata (IPFS)  
- **Security:** JWT Auth, Row-Level Security (RLS), AES Encryption  
- **APIs:** Evidence Upload, Retrieval, OCR Processing  

## **🏗 Architecture**  
```plaintext
Frontend (React + Tailwind)  
│  
├── Backend (Node.js + Supabase)  
│   ├── Auth & RLS Security  
│   ├── IPFS Storage (Pinata)  
│   └── OCR & Metadata Processing  
└── API Endpoints (REST)
