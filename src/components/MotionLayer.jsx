export default function MotionLayer({ intensity = 35, reduced = false }) {
  const style = { '--motion-intensity': `${Math.max(0, Math.min(100, intensity))}%` };
  return (
    <div className={`motion-layer ${reduced ? 'motion-reduced' : ''}`} style={style} aria-hidden="true">
      <span className="aurora aurora-one" />
      <span className="aurora aurora-two" />
      <span className="noise" />
    </div>
  );
}
