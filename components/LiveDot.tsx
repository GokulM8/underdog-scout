export default function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex h-2.5 w-2.5 ${className}`}>
      <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 animate-pulse-red" />
      <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-40 animate-ping" />
    </span>
  );
}
