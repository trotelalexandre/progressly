# Budget & Habit Tracker

A multi-functional app for managing budgets, tracking investments, reading progress, and habit tracking, built with Next.js 15, using pnpm for package management. This project leverages the new App Router and a modular architecture with one shared API folder to handle requests for all sections of the app.

## Table of Contents

- [Key Technologies](#key-technologies)
- [Features](#features)
  - [Budget Management](#budget-management)
  - [Investment Tracking](#investment-tracking)
  - [Reading Progress](#reading-progress)
  - [Habit Tracking](#habit-tracking)

## Key Technologies

- **Next.js 15 (App Router)**: Provides a hybrid server-client architecture with a modern approach to routing and layouts.
- **Prisma ORM**: Simplifies database management with a type-safe API.
- **NextAuth.js**: Handles secure authentication, supports multiple providers.
- **Tailwind CSS & Shadcn**: Used for styling, UI components, and visualization.
- **React Query or SWR**: For data-fetching, caching, and synchronization.
- **pnpm**: Efficient and fast package manager, ideal for monorepos.

## Features

### Budget Management

Track income, expenses, and budgets for different categories with monthly summaries:

- Set monthly budgets, track transactions, and view remaining amounts.
- Visualize spending distribution by category (e.g., investments, savings, expenses).
- Access detailed breakdowns of transactions by date and category.

### Investment Tracking

Monitor and track the performance of investments manually:

- Add investments and specify buy prices, quantities, and categories.
- View P&L data and track individual or total portfolio performance over time.
- Use line charts to show portfolio growth.

### Reading Progress

Organize your reading list and track progress on books:

- Add new books, specify total pages, and log the current page.
- View your progress as a percentage, with options to mark books as completed.

### Habit Tracking

Create habits and track daily completions:

- Add, edit, and delete habits with tracking logs to mark completed days.
- Visualize your habit streaks and consistency through daily/weekly graphs.
