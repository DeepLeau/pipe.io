# my-app

A modern landing page for a kanban-style productivity application.

## ✨ Features

- Animated landing page with hero section and feature highlights
- Kanban board preview showcasing the product
- Features, comparison, and workflow sections
- Pricing section with social proof
- Call-to-action sections with responsive navbar and footer
- Smooth animations powered by Framer Motion
- Supabase integration for authentication and data management
- Tailwind CSS for modern, responsive styling

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

- `src/app` — Next.js App Router: global styles, root layout, and home page
- `src/components/landing` — Landing page components (navbar, hero, features, pricing, footer, etc.)
- `src/lib` — Utility functions, Supabase client/server setup, and data helpers
- `src/lib/supabase` — Supabase client and server-side authentication helpers

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Step-by-step:**

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. In the **Environment Variables** section, add each variable from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` → paste your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → paste your Supabase anon key
4. Click **Deploy**

> ⚠️ **Important**: Make sure to add all environment variables in Vercel before deploying. If you forget, go to Vercel Dashboard → Your Project → Settings → Environment Variables to add them manually, then redeploy.

## 📝 License

MIT