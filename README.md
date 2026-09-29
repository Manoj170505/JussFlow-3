# JussFlow-3

> **Your Instagram. In flow.**  
> A continuous flow system connecting Instagram content, audience engagement, automated DM interactions, lead qualification, and customer analytics into one fluid experience.

---

## ⚡ Overview

**JussFlow-3** is a web application designed for creators, Instagram businesses, and growth agencies. It visualizes and manages the complete lifecycle of Instagram interactions—from content publication to lead acquisition and retention.

### Key Features

- 🌊 **Interactive Signal Canvas (`FlowCanvas`)**: An ambient HTML5 background canvas simulating live Instagram engagement signals (views, likes, comments, DMs) responsive to cursor tracking, touch, and scroll velocity.
- 🎯 **Interactive 6-Stage Customer Journey**:
  1. **Create**: Multi-format content tracking (Photo, Reel, Story).
  2. **Publish & Reach**: Real-time audience reach and engagement metrics.
  3. **Engage & DM**: Conversation routing with sub-second intent and keyword detection.
  4. **Automate & Qualify**: Automated qualification scoring transforming conversations into structured lead cards.
  5. **Follow Up & Customer**: Streamlined reminders, follow-ups, and seamless human handoff.
  6. **Schedule & Analytics**: Forward scheduling and multi-channel performance tracking.
- 🎨 **Modern Glassmorphism UI**: Dynamic OKLCH color space gradients, subtle micro-animations, accessible high-contrast text, and responsive typography (Sora & Manrope).
- 🚀 **Full-Stack Architecture**: Built on **TanStack Start** with server-side rendering, type-safe routing, and Nitro runtime.

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start/latest) with [TanStack Router](https://tanstack.com/router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with OKLCH dynamic theme tokens
- **Component Primitives**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Bundler**: [Vite 8](https://vite.dev/)
- **Data Fetching / State**: [TanStack React Query](https://tanstack.com/query)
- **Engine / Server**: [Nitro](https://nitro.unjs.io/)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Manoj170505/JussFlow-3.git
   cd JussFlow-3
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server with hot-module reloading and SSR support.
- `npm run build`: Compiles and bundles the application for production.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint to check for code quality and syntax issues.
- `npm run format`: Formats code using Prettier according to `.prettierrc`.

---

## 📂 Project Structure

```text
├── public/                 # Static assets (favicons, robots, icons)
├── src/
│   ├── components/         # Reusable UI & presentation components
│   │   ├── ui/             # Radix-based UI components (buttons, dialogs, etc.)
│   │   ├── FlowCanvas.tsx  # Interactive particle stream canvas
│   │   ├── Intro.tsx       # Animated splash & brand introduction
│   │   └── story.tsx       # Stage, Card, Avatar, and reveal hooks
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and error handling helpers
│   ├── routes/             # TanStack file-based routing
│   │   ├── __root.tsx      # Root document shell, fonts, and meta tags
│   │   └── index.tsx       # Landing page & flow stages
│   ├── router.tsx          # TanStack router setup
│   ├── server.ts           # Server entry point
│   ├── start.ts            # TanStack Start server configuration
│   └── styles.css          # Tailwind CSS v4 design tokens and animations
├── components.json         # Component library configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite & TanStack router plugins
```

---

## 📄 License

This project is licensed under the MIT License.
