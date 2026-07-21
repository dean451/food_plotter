# Food Plotter

A yard planner for growing your own food. Lay out raised beds and in-ground
rows to scale, mark what's already in the yard (house, driveway, trees), get
companion-planting and planting-window guidance per plant and hardiness zone,
and generate a materials + labor quote for either a DIY build or a
professional install.

## Features

- **To-scale yard layout** — drag, rotate, and resize beds on a canvas sized
  to your actual yard, with snapping and overlap detection.
- **Bed types** — raised beds in cedar, pine, or cypress, or in-ground rows
  that skip the lumber box entirely (tilled-in compost instead of a full
  soil fill).
- **Obstacles** — mark the house, driveway, and other fixed features so beds
  don't get auto-placed on top of them, and they're excluded from coverage
  math.
- **Plant panel** — a roster of plants per bed with companion-planting
  relationships (beneficial/harmful pairings with notes), planting windows,
  and sun/water needs, filtered to what actually grows in your zone.
- **Zone lookup** — enter a zip code to find your USDA hardiness zone.
- **Templates & garden sets** — pre-built bed templates and multi-bed garden
  plans (e.g. a starter vegetable set) to drop in with one click.
- **Quote sheet** — a itemized breakdown of lumber, soil, and plant cost, plus
  a DIY-materials estimate and a professional-install estimate (markup,
  labor, delivery).
- **Yard stats** — bed-coverage guidance that scales with yard size, so a
  1/4-acre lot isn't told to plant like a courtyard.
- **Sharing & accounts** — every yard has a shareable token URL; optional
  magic-link email sign-in lets you save yards to an account instead of
  relying on the link alone.

## Stack

- **Backend** — Ruby on Rails 8 (API-only controllers), SQLite, with the
  Solid stack (`solid_queue`, `solid_cache`, `solid_cable`) instead of Redis.
- **Frontend** — React + Vite, served as static assets behind the same Rails
  app in production.

## Local development

Requires Ruby (see `backend/.ruby-version`), Node, and either Docker or
[overmind](https://github.com/DarthSim/overmind) for running both processes
together.

```bash
# backend
cd backend && bin/setup --skip-server

# frontend
cd frontend && npm install
```

Then, from the repo root:

```bash
overmind start -f Procfile.dev   # backend on :3000, frontend via Vite
```

Or source `scripts.local.sh` for shortcuts (`fp-dev`, `fp-lint`, `fp-console`,
etc. — see the file for the full list) and Docker-based equivalents
(`fp-build`, `fp-start`).

### Linting

```bash
cd frontend && npm run lint    # eslint
cd backend  && bin/rubocop     # rubocop-rails-omakase
```

A pre-commit hook (`.githooks/pre-commit`) runs both, scoped to whichever
stack you actually staged changes in. Enable it once per clone with:

```bash
git config core.hooksPath .githooks
```

### Tests

Happy-path coverage, not exhaustive — models, controllers, key components,
and the pure logic in `utils.js` (cost estimates, zone/region matching, bed
placement).

```bash
cd frontend && npm run test    # vitest + testing-library
cd backend  && bin/rails test  # minitest
```

## Deployment

Ships as a single Docker image (`Dockerfile`) with a `fly.toml` for
[Fly.io](https://fly.io); SQLite persists on a mounted volume.

## License

No license file yet — until one's added, all rights are reserved by default.
