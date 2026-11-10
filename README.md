# De Anza MSA website

Next.js 15 + Tailwind, single page with About, Events, Officers and Join sections.

## Run it
```
npm install
npm run dev     # open http://localhost:3000
```

## Edit content
Everything (officers, events, pillars, Instagram link) is in `lib/data.ts`.
Replace the "Name TBA" officers with real names and set `placeholder: false`.

## Deploy free
Push to GitHub, then import the repo on vercel.com. `npm run build` also writes a static site to `out/`.
