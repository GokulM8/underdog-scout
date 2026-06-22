import { Position } from "@/lib/types";

const POSITION_COLORS: Record<Position, string> = {
  GK: "bg-gold text-background",
  DEF: "bg-blue-600 text-white",
  MID: "bg-deep-green text-foreground border border-gold/40",
  FWD: "bg-red-600 text-white",
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function PlayerAvatarCircle({
  name,
  position,
  club,
  size = 32,
  className = "",
}: {
  name: string;
  position: Position;
  club?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      title={club ? `${name} · ${club}` : name}
      className={`rounded-full border-2 border-gold flex items-center justify-center font-display shrink-0 ${POSITION_COLORS[position]} ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(10, size * 0.32) }}
    >
      {initials(name)}
    </div>
  );
}
