# HardyBert Wedding Website 💍

A custom wedding website built for the Hardy-Hilbert wedding, featuring RSVP management, event details, travel information, and registry links.

## Features

- **Home Page** – Wedding details including ceremony and reception information with location details and parking instructions
- **RSVP System** – Password-protected RSVP form with household management, dietary restriction tracking, and children attendance
- **Travel Page** – Hotel recommendations with room block information and local attractions guide (City Museum, Forest Park, Gateway Arch, etc.)
- **Registry Page** – Links to Amazon gift registry and Venmo honeymoon fund
- **Image Carousel** – Animated photo slideshow showcasing the couple
- **Dev Mode** – Development banner for testing environments
- **SEO** – Auto-generated sitemap.xml and robots.txt

## Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** – React framework with App Router
- **[React 19](https://react.dev/)** – UI library
- **[TypeScript](https://www.typescriptlang.org/)** – Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** – Radix UI + Tailwind component library
- **[Lucide React](https://lucide.dev/)** – Icon library

### Backend & Database
- **[Prisma](https://www.prisma.io/)** – Type-safe ORM
- **[Neon Database](https://neon.tech/)** – Serverless PostgreSQL
- **Cookie-based authentication** – Password protection for RSVP

### Infrastructure
- **[Docker](https://www.docker.com/)** – Multi-stage containerized builds
- **[Gitea Actions](https://docs.gitea.com/usage/actions/overview)** – CI/CD workflows
- **[Caddy](https://caddyserver.com/)** – Reverse proxy (via network)

## Database Schema

```
Household
├── id
├── name
├── hasRSVPed
├── hasDietaryRestrictions
├── dietaryRestrictions
├── notes
├── children12 (ages 4-12)
├── children3 (ages 3 and under)
└── invitees[]

Invitee
├── id
├── name
├── isAttending
└── householdId → Household
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Neon account)

### Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="postgresql://..."
RSVP_PASSWORD="your-rsvp-password"
NEXT_PUBLIC_BASE_URL="https://your-domain.com"  # For sitemap/robots.txt
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npm run prisma:seed
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
npm run build
npm run start
```

## Docker Deployment

Build and run with Docker:

```bash
# Build the image
docker build -t hardybert-wedding .

# Run the container
docker run -d \
  --name hardybert-wedding \
  --env-file .env \
  -p 3000:3000 \
  hardybert-wedding
```

## Project Structure

```
├── app/
│   ├── api/           # API routes (household, password, rsvp)
│   ├── registry/      # Gift registry page
│   ├── rsvp/          # RSVP page with auth
│   ├── travel/        # Travel & accommodations
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page with event details
│   ├── sitemap.ts     # Auto-generated sitemap.xml
│   └── robots.ts      # Auto-generated robots.txt
├── components/        # React components
│   ├── ui/            # shadcn/ui components
│   ├── ImageCarousel.tsx
│   ├── Navigation.tsx
│   ├── PasswordForm.tsx
│   ├── RSVPWrapper.tsx
│   └── SearchForm.tsx
├── lib/               # Utilities and database client
├── prisma/            # Database schema and migrations
├── public/            # Static assets and images
└── Dockerfile         # Multi-stage production build
```

## License

Private – All rights reserved.
