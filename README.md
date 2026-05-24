# my-app

A modern CRM application with a Kanban-style pipeline board for managing sales opportunities.

## ✨ Features

- Visual Kanban board for tracking sales opportunities through pipeline stages
- Add and manage opportunities with essential details
- Drag-and-drop style card display (UI structure in place)
- RESTful API for opportunity CRUD operations
- Stage management for opportunities
- Responsive design with Tailwind CSS
- Smooth animations powered by Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Supabase (SSR + Client)
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ — [Download here](https://nodejs.org/)
- A code editor — [VS Code](https://code.visualstudio.com/) recommended
- Git installed — [Install here](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
cd REPO_NAME
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a file named `.env.local` in the root of your project. This file stores secrets that your app needs to connect to external services.

**What is a .env.local file?** It's a text file where you store sensitive information (like API keys) that shouldn't be committed to Git. Next.js automatically loads variables from this file.

Copy this template into your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **No-code user tip**: To open or create a file in VS Code, press Ctrl+N (or Cmd+N on Mac) to create a new file, paste the content above, then press Ctrl+S (or Cmd+S) to save it as `.env.local` in the project folder.

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **VS Code tip**: Open the integrated terminal with Ctrl+` (or Cmd+` on Mac) to run commands without leaving your editor.

## 🔑 Environment Variables

| Variable | Required | Where to find it | Description |
|----------|----------|------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API → Project URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes | [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API → anon/public key | Public API key for client-side requests |

**How to get Supabase credentials:**

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project" or select an existing project
3. Go to **Project Settings** (gear icon)
4. Click on **API** in the sidebar
5. Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the **anon/public key** and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📁 Project Structure

- `src/app/(app)/pipeline` — Pipeline page with Kanban board
- `src/app/api/opportunities` — API routes for opportunity CRUD operations
- `src/components/pipeline` — Kanban board components (board, column, card, modal)
- `src/lib` — Shared types and utilities

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the "Deploy with Vercel" button above
2. Import your GitHub repository
3. In the Vercel dashboard, go to **Settings** → **Environment Variables**
4. Add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**

Your app will be live at a Vercel-provided URL.

## 📝 License

MIT