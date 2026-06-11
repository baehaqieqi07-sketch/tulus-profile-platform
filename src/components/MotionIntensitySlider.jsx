export default function MotionIntensitySlider({ value=1, onChange }) { return <input type="range" min="0" max="2" step="0.1" value={value} onChange={(e)=>onChange?.(Number(e.target.value))} /> }
