# Nexus Gaming Platform

A futuristic, full-stack gaming platform built with Next.js, React, Tailwind CSS, Framer Motion, and Supabase.

## Features
- **Modern UI**: Neon effects, glassmorphism, and smooth page transitions with Framer Motion.
- **Authentication**: Full login and registration system powered by Supabase Auth.
- **User Profiles & Dashboards**: View user stats, XP, and Nexus coins.
- **Game Library**: 
  - 🐍 Snake
  - ⭕ Tic Tac Toe
  - 🔢 2048
  - 🃏 Memory Match
- **Leaderboards**: Global ranking system for all games.
- **Admin Panel**: Management dashboard for system administrators.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion, Lucide React
- **Backend & DB**: Supabase (PostgreSQL, Auth)
- **Deployment**: Ready for Vercel

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Supabase Configuration**
   - Create a project on [Supabase](https://supabase.com).
   - Copy the `.env.example` to `.env.local` and add your Supabase URL and Anon Key:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - Run the SQL commands in `database_schema.sql` in your Supabase SQL Editor to create the necessary tables.

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture & Code Structure
- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI and Game wrapper components.
- `src/utils/supabase`: Supabase SSR and Client utilities.
- `src/app/globals.css`: Custom utility classes for neon and glassmorphism styles.

## License
MIT
