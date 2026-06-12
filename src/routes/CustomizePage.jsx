import { useMemo, useState } from 'react'
import V7DashboardShell from '../components/V7DashboardShell.jsx'
import PremiumButton from '../components/PremiumButton.jsx'
import LoadingSkeleton from '../components/LoadingSkeleton.jsx'
import { uploadUserFile, saveProfile } from '../lib/profileStore.js'
import { validateUpload } from '../lib/upload.js'
import { useTulusLanguage } from '../lib/i18n.js'

const layouts = ['Center Aura', 'Glass ID', 'Minimal Luxe', 'Music Focus', 'Creator Card', 'Soft Grid', 'Dark Pearl', 'Blue Halo']
const themes = ['ORANG TULUS Blue Glass', 'Black Pearl', 'Soft Lavender', 'Silver Calm', 'Midnight Cyan']

export default function CustomizePage({ user, profile, setProfile }) {
  const { t } = useTulusLanguage()
  const [draft, setDraft] = useState(profile || {})
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [advanced, setAdvanced] = useState(false)
  const [mobilePreview, setMobilePreview] = useState(false)
  const hasChanges = useMemo(() => JSON.stringify(draft) !== JSON.stringify(profile || {}), [draft, profile])
  const set = (patch) => setDraft((p) => ({ ...p, ...patch }))

  async function pickFile(event, kind, patchKey) {
    const file = event.target.files?.[0]
    if (!file) return
    const check = validateUpload(file, kind === 'music' ? 'music' : 'image', kind === 'music' ? 18 : 8)
    if (!check.ok) { setMessage(check.message); return }
    setMessage('Uploading...')
    try {
      const url = await uploadUserFile(kind, user?.id, file)
      set({ [patchKey]: url, ...(kind === 'music' ? { music_source_type: 'direct_audio', music_url: url, music_upload_url: url } : {}) })
      setMessage('Upload ready. Click save to publish.')
    } catch {
      setMessage('Upload failed. Check Supabase Storage bucket and policies.')
    }
  }

  async function save() {
    setSaving(true)
    setMessage('Saving...')
    const next = { ...draft }
    setProfile?.(() => next)
    const result = await saveProfile(next, user?.id)
    setSaving(false)
    setMessage(result?.ok ? 'Saved to Supabase.' : 'Saved locally. Check Supabase setup for production save.')
  }

  function resetPreview() {
    setDraft(profile || {})
    setMessage('Preview reset.')
  }

  return (
    <V7DashboardShell user={user} profile={draft} active="Customize">
      <div className="v100-dash-head lux-custom-head">
        <div><p className="v100-kicker">Customize Studio</p><h1>Make your profile feel premium.</h1><p>Quick Edit Mode is default. Advanced mode is optional, so you do not get confused.</p></div>
        <div className="lux-head-actions"><button className="v100-secondary" onClick={()=>setMobilePreview(!mobilePreview)}>Mobile preview</button><button className="v100-secondary" onClick={()=>setAdvanced(!advanced)}>{advanced ? 'Quick Edit' : 'Advanced Edit'}</button><PremiumButton onClick={save}>{saving ? 'Saving...' : t('save')}</PremiumButton></div>
      </div>

      {saving ? <LoadingSkeleton lines={3} /> : null}
      {message ? <p className="lux-save-state">{message}</p> : null}
      {hasChanges ? <p className="lux-unsaved">Unsaved changes detected. Review preview, then save.</p> : null}

      <section className={`lux-custom-layout ${mobilePreview ? 'mobile-preview' : ''}`}>
        <main className="v100-custom-form lux-custom-form glass-card">
          <h2>Quick Edit Mode</h2>
          <div className="lux-form-grid">
            <label>Display Name<input value={draft?.display_name || ''} onChange={(e)=>set({ display_name:e.target.value })}/></label>
            <label>Username<input value={draft?.username || ''} onChange={(e)=>set({ username:e.target.value.toLowerCase().replace(/[^a-z0-9._]/g,'') })}/></label>
            <label className="wide">Bio<textarea value={draft?.bio || ''} onChange={(e)=>set({ bio:e.target.value })} maxLength={280}/></label>
            <label>Layout<select value={draft?.layout_name || 'Center Aura'} onChange={(e)=>set({ layout_name:e.target.value })}>{layouts.map((x)=><option key={x}>{x}</option>)}</select></label>
            <label>Theme<select value={draft?.theme_name || 'ORANG TULUS Blue Glass'} onChange={(e)=>set({ theme_name:e.target.value })}>{themes.map((x)=><option key={x}>{x}</option>)}</select></label>
            <label>Accent Color<input type="color" value={draft?.accent_color || '#6ea2ff'} onChange={(e)=>set({ accent_color:e.target.value })}/></label>
            <label>Visibility<select value={draft?.visibility || 'public'} onChange={(e)=>set({ visibility:e.target.value })}><option value="public">public</option><option value="unlisted">unlisted</option><option value="private">private</option></select></label>
          </div>

          <h2>Upload</h2>
          <section className="v100-uploader-grid lux-uploader-grid">
            <label>Avatar<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e)=>pickFile(e,'avatar','avatar_url')}/><span>jpg/png/webp/gif</span></label>
            <label>Background<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e)=>pickFile(e,'background','background_url')}/><span>fullscreen safe background</span></label>
            <label>Gallery Photo<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e)=>pickFile(e,'gallery','gallery_preview_url')}/><span>optional gallery photo</span></label>
            <label>Music<input type="file" accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg,audio/mp4,audio/m4a" onChange={(e)=>pickFile(e,'music','music_direct_url')}/><span>mp3/wav/ogg/m4a</span></label>
          </section>

          <h2 id="music">Music</h2>
          <div className="lux-form-grid">
            <label>Music Title<input value={draft?.music_title || ''} onChange={(e)=>set({ music_title:e.target.value })}/></label>
            <label>Music Artist<input value={draft?.music_artist || ''} onChange={(e)=>set({ music_artist:e.target.value })}/></label>
            <label className="wide">Music URL<input value={draft?.music_url || draft?.music_direct_url || draft?.music_external_url || ''} onChange={(e)=>set({ music_url:e.target.value, music_source_type:e.target.value.match(/\.(mp3|wav|ogg|m4a)(\?|$)/i)?'direct_audio':'external_platform' })} placeholder="Direct .mp3/.wav/.ogg/.m4a or YouTube/Spotify/TikTok/SoundCloud/Apple Music link"/></label>
            <label>Volume<input type="range" min="0" max="1" step="0.05" value={draft?.music_volume ?? .72} onChange={(e)=>set({ music_volume:Number(e.target.value) })}/></label>
            <label className="switch-row"><input type="checkbox" checked={draft?.music_loop !== false} onChange={(e)=>set({ music_loop:e.target.checked })}/> Loop music</label>
          </div>

          <h2 id="effects">Effects & Cursor</h2>
          <div className="v100-toggle-grid lux-toggle-grid">
            {[
              ['show_star_dust','Star dust'], ['show_bokeh','Bokeh'], ['show_floating_orb','Floating orb'], ['show_glass_shine','Glass shine'], ['show_button_ripple','Button ripple'], ['show_custom_cursor','Custom cursor PC'], ['show_click_sparkle','Click sparkle'], ['reduce_motion','Reduce motion']
            ].map(([key,label]) => <label key={key}><input type="checkbox" checked={draft?.[key] !== false} onChange={(e)=>set({ [key]: e.target.checked })}/> {label}</label>)}
          </div>

          {advanced ? <section className="lux-advanced glass-card"><h2>Advanced Edit Mode</h2><label>Background overlay<input type="range" min="0" max="1" step="0.05" value={draft?.background_overlay ?? .45} onChange={(e)=>set({ background_overlay:Number(e.target.value) })}/></label><label>Particle amount<input type="range" min="0" max="80" value={draft?.particle_amount ?? 42} onChange={(e)=>set({ particle_amount:Number(e.target.value) })}/></label><label>Motion speed<input type="range" min="0.5" max="1.8" step="0.1" value={draft?.motion_speed ?? 1} onChange={(e)=>set({ motion_speed:Number(e.target.value) })}/></label></section> : null}

          <div className="lux-sticky-save"><button className="v100-secondary" onClick={resetPreview}>Reset preview</button><button className="v100-secondary" onClick={()=>set({ visibility: draft.visibility === 'public' ? 'private' : 'public' })}>{draft.visibility === 'public' ? 'Unpublish' : 'Publish'}</button><PremiumButton onClick={save}>{saving ? 'Saving...' : t('save')}</PremiumButton></div>
        </main>

        <aside className="lux-live-preview glass-card">
          <p className="v100-kicker">Live preview</p>
          <div className="lux-preview-phone">
            <div className="lux-preview-bg" style={draft?.background_url ? { backgroundImage: `url(${draft.background_url})` } : undefined}/>
            <div className="lux-preview-avatar">{draft?.avatar_url ? <img src={draft.avatar_url} alt="avatar"/> : (draft?.display_name || 'T').slice(0,1)}</div>
            <h3>{draft?.display_name || 'TULUS User'}</h3>
            <small>@{draft?.username || 'bekiw'}</small>
            <p>{draft?.bio || 'quiet profile space.'}</p>
            <b>{draft?.layout_name || 'Center Aura'}</b>
          </div>
          <a className="v100-secondary" href={`/${draft?.username || 'bekiw'}`}>Open public preview</a>
        </aside>
      </section>
    </V7DashboardShell>
  )
}
