# Solfeggio Frequency Player

**[solfeggio.klokie.com](https://solfeggio.klokie.com)**

A browser-based tone generator for the [Solfeggio frequencies](https://en.wikipedia.org/wiki/Solfeggio_frequencies), built with the Web Audio API.

## What are Solfeggio frequencies?

The Solfeggio frequencies are a set of tones rooted in a medieval hymn to John the Baptist. The original six notes -- Ut, Re, Mi, Fa, Sol, La -- were rediscovered in the 1970s by Joseph Puleo, who derived a series of frequencies from numerical patterns in the Book of Numbers. Proponents associate each frequency with specific healing or meditative properties, though scientific evidence for these claims remains limited.

| Frequency | Association                                |
| --------- | ------------------------------------------ |
| 174 Hz    | Pain Relief and Foundation                 |
| 285 Hz    | Healing Tissue and Safety                  |
| 396 Hz    | Liberating Guilt and Fear                  |
| 417 Hz    | Undoing Situations and Facilitating Change |
| 528 Hz    | Transformation and Miracles (DNA Repair)   |
| 639 Hz    | Connecting / Relationships                 |
| 741 Hz    | Awakening Intuition                        |
| 852 Hz    | Returning to Spiritual Order               |
| 963 Hz    | Divine Consciousness                       |

Select a frequency to play it as a pure tone through the Web Audio API. Use the octave selector to shift pitches up or down, and the waveform selector to change the timbre.

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
| `npm run deploy`| Build & deploy to Cloudflare Pages |
