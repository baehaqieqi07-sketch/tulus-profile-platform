export const EFFECT_PRESETS = {
  Calm: { particles: 24, glow: .22, speed: .8, cursor: 'Blue Ring' },
  Smooth: { particles: 36, glow: .32, speed: 1, cursor: 'Glass Cursor' },
  Dreamy: { particles: 44, glow: .42, speed: .9, cursor: 'Pearl Cursor' },
  'Star Dust': { particles: 70, glow: .55, speed: 1.1, cursor: 'Blue Ring' },
  'Luxury Minimal': { particles: 18, glow: .28, speed: .7, cursor: 'Minimal Cursor' }
}
export function resolveEffectPreset(name = 'Calm') { return EFFECT_PRESETS[name] || EFFECT_PRESETS.Calm }
