import { SquadPlayer } from "@/lib/types";
import PlayerAvatarCircle from "./PlayerAvatarCircle";

const POSITION_BADGE: Record<SquadPlayer["position"], string> = {
  GK: "bg-gold text-background",
  DEF: "bg-blue-600 text-white",
  MID: "bg-deep-green text-foreground border border-gold/40",
  FWD: "bg-red-600 text-white",
};

export default function PlayerCard({
  player,
  nationFlag,
}: {
  player: SquadPlayer;
  nationFlag: string;
}) {
  return (
    <div className="relative rounded-sm border border-white/10 bg-black/30 p-4 flex flex-col items-center text-center gap-2 transition-transform duration-200 hover:-translate-y-1 hover:border-gold/40">
      {player.isKeyPlayer && (
        <span
          className="absolute top-2 right-2 text-gold text-lg"
          aria-label="Key player"
          title="Key player"
        >
          ★
        </span>
      )}
      <PlayerAvatarCircle name={player.name} position={player.position} size={64} />
      <p className="font-display text-lg tracking-wide mt-1">{player.name}</p>
      <p className="text-xs text-foreground/60 flex items-center gap-1.5">
        <span aria-hidden>{nationFlag}</span>
        {player.club}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <span
          className={`text-[10px] font-display px-2 py-0.5 rounded-sm tracking-wide ${POSITION_BADGE[player.position]}`}
        >
          {player.position}
        </span>
        <span className="text-xs text-foreground/50">Age {player.age}</span>
        <span className="text-xs text-foreground/50">#{player.number}</span>
      </div>
    </div>
  );
}
