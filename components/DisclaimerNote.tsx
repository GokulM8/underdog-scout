export default function DisclaimerNote({ text }: { text: string }) {
  return (
    <p
      className="italic flex items-center gap-1"
      style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 8 }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
        aria-hidden
      >
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
        <path d="M12 9h.01" />
        <path d="M11 12h1v4h1" />
      </svg>
      <span>{text}</span>
    </p>
  );
}
