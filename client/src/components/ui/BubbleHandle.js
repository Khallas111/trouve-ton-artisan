export default function BubbleHandle({ className = "" }) {
  const classes = ["bubble-handle", className].filter(Boolean).join(" ");

  return (
    <span className={classes} aria-hidden="true">
      <span className="bubble-handle__body" />
      <span className="bubble-handle__tail" />
    </span>
  );
}
