# FundiLink

A modern home services platform that connects users with trusted, background-checked professionals such as electricians, plumbers, cleaners, mechanics, and technicians.

Built with [Lovable](https://lovable.dev).

## Features

- **Landing Page** — Beautiful hero section with GSAP animations, service categories, how-it-works steps, testimonials, and CTA
- **Service Search** — Filterable directory with category, location, and availability filters
- **Professional Profiles** — Detailed profiles with portfolio, reviews, skills, and booking
- **User Dashboard** — Track requests, saved pros, and account settings
- **Professional Dashboard** — Manage listings, incoming requests, reviews, and availability
- **Technician Mobile App** — One-tap job status updates, earnings overview, and schedule
- **Admin Dashboard** — Verify technicians, monitor requests, and platform health
- **Dark/Light Mode** — Smooth theme switching with system preference detection
- **Fully Responsive** — Optimized for mobile, tablet, and desktop

## Tech Stack

- React 19 + TypeScript
- TanStack Router (file-based routing)
- TanStack React Query
- Tailwind CSS 4 with custom design tokens (oklch color system)
- GSAP + ScrollTrigger for animations
- Radix UI primitives
- Vite + TanStack Start (SSR)

## Design System

The project uses a comprehensive design token system with:

- **Colors**: oklch-based palette with light/dark mode support
- **Typography**: Sora (display) + Plus Jakarta Sans (body) font pairing
- **Shadows**: Layered shadow system (soft, card, lift, glow)
- **Gradients**: Hero, brand, and warm gradient variants
- **Animations**: Smooth transitions, scroll reveals, and micro-interactions
- **Glass effects**: Backdrop blur with subtle borders

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e71c3df5-b43d-403a-861c-1ddf3fdbd626).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.
