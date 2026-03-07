"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ShaderBackground from "./ShaderBackground";

const FREQUENCIES = [
  { freq: 174, name: "Pain Relief & Foundation" },
  { freq: 285, name: "Healing Tissue & Safety" },
  { freq: 396, name: "Liberating Guilt & Fear" },
  { freq: 417, name: "Facilitating Change" },
  { freq: 528, name: "Transformation & Miracles" },
  { freq: 639, name: "Connection & Relationships" },
  { freq: 741, name: "Awakening Intuition" },
  { freq: 852, name: "Returning to Spiritual Order" },
  { freq: 963, name: "Divine Consciousness" },
];

const WAVEFORMS: OscillatorType[] = ["sine", "triangle", "sawtooth", "square"];
const WAVEFORM_LABELS: Record<string, string> = {
  sine: "Sine",
  triangle: "Triangle",
  sawtooth: "Saw",
  square: "Square",
};

const OCTAVE_SHIFTS = [-2, -1, 0, 1, 2];

type ActiveTone = {
  oscillator: OscillatorNode;
  gain: GainNode;
};

const FADE_MS = 80;
const CLEANUP_MS = 120;
const TONE_GAIN = 0.15;

const SolfeggioPlayer = () => {
  const ctxRef = useRef<AudioContext | null>(null);
  const tonesRef = useRef(new Map<number, ActiveTone>());

  const [octave, setOctave] = useState(0);
  const [waveform, setWaveform] = useState<OscillatorType>("sine");
  const [bg, setBg] = useState(1);
  const [playing, setPlaying] = useState<Set<number>>(new Set());
  const [infoSlide, setInfoSlide] = useState(0);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const toggle = useCallback(
    (baseFreq: number) => {
      const tones = tonesRef.current;

      if (tones.has(baseFreq)) {
        const t = tones.get(baseFreq)!;
        const now = t.gain.context.currentTime;
        t.gain.gain.exponentialRampToValueAtTime(0.0001, now + FADE_MS / 1000);
        const osc = t.oscillator;
        const gain = t.gain;
        setTimeout(() => {
          osc.stop();
          osc.disconnect();
          gain.disconnect();
        }, CLEANUP_MS);
        tones.delete(baseFreq);
        setPlaying((prev) => {
          const next = new Set(prev);
          next.delete(baseFreq);
          return next;
        });
        return;
      }

      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = waveform;
      osc.frequency.value = baseFreq * 2 ** octave;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        TONE_GAIN,
        ctx.currentTime + FADE_MS / 1000
      );

      osc.connect(gain).connect(ctx.destination);
      osc.start();

      tones.set(baseFreq, { oscillator: osc, gain });
      setPlaying((prev) => new Set(prev).add(baseFreq));
    },
    [getCtx, octave, waveform]
  );

  useEffect(() => {
    tonesRef.current.forEach((t, baseFreq) => {
      t.oscillator.frequency.exponentialRampToValueAtTime(
        baseFreq * 2 ** octave,
        t.oscillator.context.currentTime + 0.15
      );
    });
  }, [octave]);

  useEffect(() => {
    tonesRef.current.forEach((t) => {
      t.oscillator.type = waveform;
    });
  }, [waveform]);

  const stopAll = useCallback(() => {
    tonesRef.current.forEach((t) => {
      const now = t.gain.context.currentTime;
      t.gain.gain.exponentialRampToValueAtTime(0.0001, now + FADE_MS / 1000);
      const osc = t.oscillator;
      const gain = t.gain;
      setTimeout(() => {
        osc.stop();
        osc.disconnect();
        gain.disconnect();
      }, CLEANUP_MS);
    });
    tonesRef.current.clear();
    setPlaying(new Set());
  }, []);

  useEffect(() => {
    const tones = tonesRef.current;
    return () => {
      tones.forEach((t) => {
        t.oscillator.stop();
        t.oscillator.disconnect();
        t.gain.disconnect();
      });
    };
  }, []);

  useEffect(() => {
    try {
      ((window as unknown as Record<string, unknown[]>).adsbygoogle ||= []).push({});
    } catch {
      // AdSense not loaded
    }
  }, []);

  const displayFreq = (base: number) => Math.round(base * 2 ** octave);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <ShaderBackground variant={bg} />

      <div className="relative z-10 w-full max-w-lg">
        <div className="backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h1 className="text-2xl font-light text-white/90 tracking-wider text-center mb-8">
            Solfeggio Frequencies
          </h1>

          <div className="mb-5">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
              Octave
            </div>
            <div className="flex gap-1.5">
              {OCTAVE_SHIFTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setOctave(s)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    octave === s
                      ? "bg-white/20 text-white"
                      : "bg-white/[0.04] text-white/30 hover:bg-white/[0.08] hover:text-white/50"
                  }`}
                >
                  {s > 0 ? `+${s}` : s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
              Waveform
            </div>
            <div className="flex gap-1.5">
              {WAVEFORMS.map((w) => (
                <button
                  key={w}
                  onClick={() => setWaveform(w)}
                  className={`flex-1 py-2 rounded-xl text-sm capitalize transition-all duration-200 ${
                    waveform === w
                      ? "bg-white/20 text-white"
                      : "bg-white/[0.04] text-white/30 hover:bg-white/[0.08] hover:text-white/50"
                  }`}
                >
                  {WAVEFORM_LABELS[w]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
            {FREQUENCIES.map(({ freq, name }) => {
              const active = playing.has(freq);
              return (
                <button
                  key={freq}
                  onClick={() => toggle(freq)}
                  className={`relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 ${
                    active
                      ? "bg-white/20 shadow-lg shadow-white/[0.06] scale-[1.02]"
                      : "bg-white/[0.04] hover:bg-white/[0.08]"
                  }`}
                >
                  {active && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent animate-pulse" />
                  )}
                  <div className="relative">
                    <div
                      className={`text-lg font-medium tabular-nums transition-colors duration-300 ${
                        active ? "text-white" : "text-white/60"
                      }`}
                    >
                      {displayFreq(freq)}{" "}
                      <span className="text-xs font-normal opacity-60">Hz</span>
                    </div>
                    <div
                      className={`text-[11px] leading-tight mt-1.5 transition-colors duration-300 ${
                        active ? "text-white/60" : "text-white/25"
                      }`}
                    >
                      {name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <div className="w-20">
              {playing.size > 0 && (
                <button
                  onClick={stopAll}
                  className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
                >
                  Stop all
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setBg(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    bg === i
                      ? "bg-white/70 scale-150"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Background ${i + 1}`}
                />
              ))}
            </div>
            <div className="w-20 flex justify-end">
              <a
                href="https://ko-fi.com/klokie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
              >
                Support ♥
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", maxWidth: 468, height: 60 }}
            data-ad-client="ca-pub-REPLACE_WITH_YOUR_PUBLISHER_ID"
            data-ad-slot="REPLACE_WITH_YOUR_AD_SLOT"
            data-ad-format="horizontal"
            data-full-width-responsive="false"
          />
        </div>

        <div className="mt-6 max-w-md mx-auto text-center text-white/30 text-xs leading-relaxed px-4">
          {[
            <p key={0}>
              The Solfeggio frequencies are a set of tones rooted in a medieval
              hymn to John the Baptist, rediscovered in the 1970s by Joseph
              Puleo. Each frequency is associated with specific healing or
              meditative properties.
            </p>,
            <p key={1}>
              The lower tones (174–285 Hz) are linked to physical healing and
              pain relief. The middle range (396–639 Hz) addresses emotional
              balance — releasing fear, facilitating change, and strengthening
              relationships. The highest tones (741–963 Hz) are said to awaken
              intuition and connect to higher consciousness.
            </p>,
            <p key={2}>
              Scientific evidence for these claims remains limited, but the
              frequencies are widely used in meditation, yoga, and sound
              therapy practices around the world.{" "}
              <a
                href="https://en.wikipedia.org/wiki/Solfeggio_frequencies"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/20 hover:text-white/50 transition-colors"
              >
                Learn more on Wikipedia →
              </a>
            </p>,
          ][infoSlide]}
          <div className="flex items-center justify-center gap-3 mt-4">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setInfoSlide(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  infoSlide === i
                    ? "bg-white/70 scale-150"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Info ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolfeggioPlayer;
