# GitHub Copilot Custom Instructions

## Project Overview
Sacrament Meeting Planner - A Next.js application for planning and managing sacrament meeting agendas.

## Tech Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript (strict mode, no `any`)
- Styling: Tailwind CSS
- Database: SQLite (better-sqlite3)

## Component Architecture
- Pages: /, /meetings, /meetings/[id], /meetings/current
- API Routes: /api/meetings, /api/meetings/[id]
- Components: Header, Footer, NavLinks, MeetingCard, MeetingDetails

## Data Model
- Entity: Meeting
- Fields: id, date, wardName, topic, conductor, prayers, talks, sacrament

## Code Conventions
- Use TypeScript with explicit types (no `any`)
- Use Tailwind CSS for styling
- Use next/font for fonts
- Use next/image for images
- API routes return JSON with proper status codes (200, 400, 404)

## Database
- SQLite via better-sqlite3
- File: lib/meetings-db.ts
- Functions: getAllMeetings, getMeetingById, getMeetingByDate