import { RoadToEvent } from "@/lib/types";

export default function RoadToTimeline({ events }: { events: RoadToEvent[] }) {
  return (
    <ol className="relative border-l border-gold/30 pl-6 space-y-6">
      {events.map((event, index) => (
        <li key={`${event.year}-${index}`} className="relative">
          <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-gold border-2 border-background" />
          <span className="font-display text-gold text-lg tracking-wide">{event.year}</span>
          <p className="text-foreground/80 mt-1">{event.description}</p>
        </li>
      ))}
    </ol>
  );
}
