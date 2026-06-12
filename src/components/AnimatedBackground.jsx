export default function AnimatedBackground({ density = 'normal' }) {
  const starCount = density === 'soft' ? 24 : 48
  const bokehCount = density === 'soft' ? 12 : 24
  return (
    <div className="tulus-animated-bg" aria-hidden="true">
      <span className="orb one" />
      <span className="orb two" />
      <span className="orb three" />
      {Array.from({ length: starCount }).map((_, i) => <i className="star" key={`s${i}`} style={{ '--i': i }} />)}
      {Array.from({ length: bokehCount }).map((_, i) => <i className="bokeh" key={`b${i}`} style={{ '--i': i }} />)}
    </div>
  )
}
