# Solfeggio Frequency Player

A browser-based tone generator for the six classic Solfeggio frequencies, built with the Web Audio API.

| Frequency | Association                                |
| --------- | ------------------------------------------ |
| 396 Hz    | Liberating Guilt and Fear                  |
| 417 Hz    | Undoing Situations and Facilitating Change |
| 528 Hz    | Transformation and Miracles (DNA Repair)   |
| 639 Hz    | Connecting / Relationships                 |
| 741 Hz    | Awakening Intuition                        |
| 852 Hz    | Returning to Spiritual Order               |

Click a button to play that frequency for 10 seconds via an oscillator routed through a shared `AudioContext`.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

Open <http://localhost:3000> to use the player.

## Scripts

| Command         | Description            |
| --------------- | ---------------------- |
| `npm run dev`   | Start dev server       |
| `npm run build` | Production build       |
| `npm run start` | Serve production build |
| `npm run lint`  | Run ESLint             |
