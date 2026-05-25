# VedaAI – AI Assessment Creator

> An AI-powered platform that lets teachers create assignments and generate structured question papers instantly using large language models.

🔗 **Live Demo**: [vedaai-frontend-six.vercel.app](https://vedaai-frontend-six.vercel.app)
📦 **Repo**: [github.com/LalitWagh34/vedaai](http://github.com/LalitWagh34/vedaai)

---

## What it does

Teachers fill out a simple assignment form — subject, class, question types, difficulty — and VedaAI generates a fully structured question paper using AI. Papers are organized into sections, tagged by difficulty, and include an answer key. The whole process runs asynchronously via a job queue with real-time status updates.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, TailwindCSS, Zustand |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB Atlas |
| Queue / Cache | BullMQ + Redis (Upstash) |
| AI | Groq API — `llama-3.3-70b-versatile` |
| Realtime | Socket.IO |

---

## How it works

1. Teacher fills the assignment form (title, subject, class, question types)
2. Frontend sends `POST /api/assignments` to the backend
3. Backend creates the assignment in MongoDB and pushes a job to BullMQ
4. Worker picks up the job, builds a structured prompt, and calls the Groq API
5. Response is parsed and stored as a `GeneratedPaper` document in MongoDB
6. Frontend polls every 3 seconds until the paper is ready
7. Output page renders the structured question paper with sections and answer key

---

## Features

- Create assignments with multiple question types (MCQ, short answer, long answer)
- AI-generated question papers with section-wise organization (Section A, B, C)
- Difficulty tagging — Easy, Moderate, Hard
- Answer key generation
- PDF export via browser print
- Real-time job status updates via Socket.IO
- Mobile-responsive UI with floating bottom navigation

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Redis (local or Upstash)
- Groq API key — [get one free at console.groq.com](https://console.groq.com)

### Installation

```bash
git clone https://github.com/LalitWagh34/vedaai.git
cd vedaai
npm install
```

### Environment setup

```bash
# Backend
cp apps/backend/.env.example apps/backend/.env
```

Fill in `apps/backend/.env`:
```env
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
GROQ_API_KEY=your_groq_api_key
```

```bash
# Frontend
cp apps/frontend/.env.example apps/frontend/.env.local
```

### Run locally

```bash
# Terminal 1 — Backend
cd apps/backend
npm run dev

# Terminal 2 — Frontend
cd apps/frontend
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:4000](http://localhost:4000)

---

## Project Structure

```
vedaai/
├── apps/
│   ├── frontend/          # Next.js app
│   │   ├── app/           # Pages and routes
│   │   ├── components/    # UI components
│   │   ├── store/         # Zustand state
│   │   └── lib/           # API client
│   └── backend/           # Express API
│       ├── routes/        # API endpoints
│       ├── workers/       # BullMQ job workers
│       └── models/        # MongoDB models
```

---

