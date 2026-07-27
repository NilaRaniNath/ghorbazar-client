# 🏢 GhorBazar — Production-Ready Agentic AI Real Estate Platform

GhorBazar is a state-of-the-art, full-stack real estate marketplace powered by **Agentic AI**. Built with **Next.js 14, TypeScript, Express, MongoDB, and Google Gemini API**, GhorBazar offers seamless property listing, advanced search & filtering, real-time AI property recommendations, and an intelligent context-aware real estate chat assistant.

---

Live Deployment Links
Live Client Application: https://ghorbazar-online-platform.vercel.app

Production API Server: https://ghorbazar-server.vercel.app

## 🌟 Key Features

### 🤖 Agentic AI Integration
- **AI Smart Recommendation Engine:** Analyzes user preferences, budget, location, and property attributes to deliver hyper-personalized property recommendations.
- **Context-Aware AI Chat Assistant:** Interactive real estate assistant trained on real-time platform data with conversation history retention and suggested prompt follow-ups.

### 🏡 Core Real Estate Functionality
- **Dynamic Property Listings:** Grid view with custom skeleton loaders, badge tags, pricing metrics, and location metadata.
- **Advanced Explore & Filtering:** Real-time multi-criteria filtering (Category, Price Range, Location), sorting options, and paginated responses.
- **Property Management (CRUD):** Add, Edit, View, and Delete properties via protected routes with instant image hosting through ImgBB API.
- **Interactive Visual Analytics:** Integrated Recharts analytics on user dashboards for market pricing trends and category distributions.

### 🔒 Authentication & Security
- **JWT Authentication & Authorization:** Secure HTTP-only/Bearer token-based session management.
- **Google OAuth 2.0 Integration:** Native social login flow using `@react-oauth/google`.
- **Demo Login System:** Instant auto-fill functionality for hassle-free evaluator access.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom Dark/Violet Glassmorphism Palette)
- **State & Data Fetching:** TanStack Query (React Query v5)
- **Data Visualization:** Recharts
- **Icons & UI Utilities:** Lucide React, Framer Motion

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** Native MongoDB Driver
- **Authentication:** JWT (JSON Web Tokens), Google OAuth2
- **Image Pipeline:** ImgBB REST API

### AI Infrastructure
- **LLM Provider:** Google Gemini API (`@google/genai`)