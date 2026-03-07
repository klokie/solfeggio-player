"use client";

type BlobDef = {
  color: string;
  opacity: number;
  size: number;
  x: number;
  y: number;
};

type Variant = {
  base: string;
  blobs: BlobDef[];
};

const VARIANTS: Variant[] = [
  {
    base: "#060d08",
    blobs: [
      { color: "#0d778f", opacity: 0.4, size: 60, x: 20, y: 30 },
      { color: "#99fa2a", opacity: 0.15, size: 45, x: 65, y: 55 },
      { color: "#362238", opacity: 0.5, size: 70, x: 45, y: 10 },
      { color: "#143620", opacity: 0.3, size: 55, x: 80, y: 75 },
    ],
  },
  {
    base: "#0a0018",
    blobs: [
      { color: "#7835ff", opacity: 0.35, size: 65, x: 25, y: 25 },
      { color: "#cd0ced", opacity: 0.25, size: 55, x: 70, y: 50 },
      { color: "#0000f7", opacity: 0.3, size: 60, x: 15, y: 65 },
      { color: "#be04cf", opacity: 0.2, size: 50, x: 80, y: 15 },
    ],
  },
  {
    base: "#050d1a",
    blobs: [
      { color: "#4e7fd9", opacity: 0.35, size: 65, x: 20, y: 20 },
      { color: "#fad041", opacity: 0.25, size: 50, x: 60, y: 35 },
      { color: "#fa722a", opacity: 0.2, size: 55, x: 40, y: 65 },
      { color: "#121bc9", opacity: 0.3, size: 70, x: 75, y: 55 },
    ],
  },
];

const ANIM_NAMES = ["drift-1", "drift-2", "drift-3", "drift-4"];
const DURATIONS = ["20s", "25s", "30s", "22s"];
const DELAYS = ["0s", "-7s", "-13s", "-4s"];

const ShaderBackground = ({ variant }: { variant: number }) => {
  const { base, blobs } = VARIANTS[variant] ?? VARIANTS[0];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{ backgroundColor: base }}
      />
      {blobs.map((blob, i) => (
        <div
          key={`${variant}-${i}`}
          style={{
            position: "absolute",
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            width: `${blob.size}vmax`,
            height: `${blob.size}vmax`,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            opacity: blob.opacity,
            filter: "blur(60px)",
            animation: `${ANIM_NAMES[i]} ${DURATIONS[i]} ease-in-out infinite`,
            animationDelay: DELAYS[i],
          }}
        />
      ))}
    </div>
  );
};

export default ShaderBackground;
