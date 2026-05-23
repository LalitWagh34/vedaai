# VedaAI – AI Assessment Creator

An AI-powered platform that allows teachers to create assignments and generate question papers using AI.

## Architecture

- **Frontend**: Next.js 14 + TypeScript + Zustand + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB (Atlas)
- **Cache/Queue**: Redis (Upstash) + BullMQ
- **AI**: Groq API (llama-3.3-70b-versatile)
- **Realtime**: Socket.IO

## Flow

1. Teacher fills assignment form (title, subject, class, question types)
2. Frontend sends POST to `/api/assignments`
3. Backend creates assignment in MongoDB and adds job to BullMQ queue
4. Worker picks up job, builds structured prompt, calls Groq API
5. Response parsed and stored as GeneratedPaper in MongoDB
6. Frontend polls every 3 seconds until paper is ready
7. Output page renders structured question paper

## Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Redis (local or Upstash)
- Groq API key

### Installation

```bash
# Clone the repo
git clone https://github.com/LalitWagh34/vedaai.git
cd vedaai

# Install all dependencies
npm install

# Setup backend env
cp apps/backend/.env.example apps/backend/.env
# Fill in your MONGODB_URI, REDIS_URL, GROQ_API_KEY

# Setup frontend env
cp apps/frontend/.env.example apps/frontend/.env.local
```

### Running locally

```bash
# Terminal 1 - Backend
cd apps/backend
npm run dev

# Terminal 2 - Frontend
cd apps/frontend
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:4000

## Features

- Create assignments with multiple question types
- AI-generated structured question papers
- Section-wise organization (Section A, B, etc.)
- Difficulty tags (Easy, Moderate, Hard)
- Answer key generation
- PDF export via browser print
- Real-time job status updates
- Mobile responsive UI