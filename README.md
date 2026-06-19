# AirlineMS

A full-stack airline management system. Airlines register an account and
get a scoped dashboard to manage their entire operation: aircraft, pilots,
crew members, routes, flights, passengers, bookings, maintenance schedules,
and incident reports.

Built as a Database Management Systems (DBMS) course project.

## Features

- **Multi-tenant by design** — each airline only sees and manages its own data
- **Authentication** — airline sign-up and sign-in with scoped sessions
- **Fleet management** — track aircraft by make, model, capacity, and status (Parked / In Service / Maintenance), with pilot assignment
- **People management** — pilots, crew members (with role), and passengers, all linked to the airline
- **Route & flight operations** — define airport-to-airport routes, schedule flights with departure/arrival times and pricing, track flight status (Scheduled / Delayed / Cancelled / Completed)
- **Bookings** — issue tickets linking passengers to flights; flight passenger counts update automatically
- **Maintenance tracking** — log maintenance jobs per aircraft with status (Scheduled / In Progress / Completed) and date ranges
- **Incident logging** — record incidents against specific flights with description and date
- **Overview dashboard** — summary stats and recent activity across the airline's operation
- **Data tables** — sortable, filterable tables for every entity with inline row actions (edit / delete)
- **Dark mode** — light/dark theme toggle

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** SQLite via Turso (`@libsql/client`) with Drizzle ORM
- **UI:** shadcn/ui, Radix UI, Tailwind CSS, Recharts
- **Forms:** React Hook Form + Zod validation
- **Data fetching:** TanStack Query (React Query) + Axios
- **Linting/Formatting:** Biome
- **Package Manager:** pnpm

## Database Schema

| Table | Description |
|---|---|
| `airline` | Registered airlines (auth + tenant root) |
| `airport` | Airport registry (name, city, country) |
| `aircraft` | Fleet — make, model, capacity, status, pilot assignment |
| `route` | Origin → destination pairs with duration |
| `flight` | Scheduled flights with route, aircraft, status, price |
| `pilot` | Pilots assigned to an airline and optionally an aircraft |
| `crew_member` | Crew with role, assigned to airline and aircraft |
| `passenger` | Passengers registered under an airline |
| `ticket` | Bookings linking a passenger to a flight |
| `maintenance` | Maintenance jobs per aircraft with status and dates |
| `incident` | Incident reports linked to a specific flight |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- A [Turso](https://turso.tech) database (or any libsql-compatible SQLite URL)

### Setup

```bash
git clone <repository-url>
cd airlinems
pnpm install
```

Create a `.env` file in the root with your database credentials:

```env
DATABASE_URL=your-turso-database-url
DATABASE_AUTH_TOKEN=your-turso-auth-token
```

Run migrations to set up the schema:

```bash
pnpm db push
```

Optionally seed the database with sample data:

```bash
pnpm seed
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to register an airline and explore the dashboard.

### Other Commands

```bash
pnpm build       # Production build
pnpm start       # Serve the production build
pnpm db studio   # Open Drizzle Studio (visual DB browser)
pnpm fix         # Lint and format with Biome
```

## Project Structure
src/

├── app/

│   ├── auth/              # Sign-in and sign-up pages

│   └── (dashboard)/       # Protected dashboard routes

│       ├── overview/      # Summary stats and activity

│       ├── flights/       # Flight management

│       ├── bookings/      # Ticket / booking management

│       ├── records/       # Passengers, pilots, crew, aircraft, airports, routes

│       └── management/    # Maintenance and incidents

├── components/

│   ├── forms/             # One form component per entity

│   ├── tables/            # One table component per entity

│   └── ui/                # shadcn/ui primitives

├── db/

│   ├── tables.ts          # Drizzle table definitions (schema)

│   ├── relations.ts       # Drizzle relation definitions

│   └── joins.ts           # Reusable join query helpers

├── server/                # Server actions per entity (CRUD)

├── validators/            # Zod schemas per entity

├── lib/                   # Utilities and env config

└── scripts/

└── seed.ts            # Database seeder using Faker

drizzle/

└── migrations/            # Auto-generated SQL migration files
## Known Limitations

- No role-based access within an airline (all users of an airline have full access)
- Authentication is session-based with no token refresh mechanism
- Designed for single-airline use per account; no super-admin view across all airlines
