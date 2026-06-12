import { useMemo, useState } from 'react'
import V7DashboardShell from '../components/V7DashboardShell.jsx'
import BrandIcon from '../components/BrandIcon.jsx'
import { uploadUserFile, saveProfile } from '../lib/profileStore.js'
import { validateUpload } from '../lib/upload.js'

const layouts = ['Center Aura','Glass ID','Minimal Luxe','Music Focus','Creator Card','Soft Grid','Dark Pearl','Blue Halo']
const themes = ['ORANG TULUS Blue Glass','Black Pearl','Soft Lavender','Silver Calm','Midnight Cyan']

export default function CustomizePage({ user, profile, setProfile }) {
  const [draft,setDraft] = useState(profile || {})
  const [saving,setSaving] = useState(false)
  const [message,setMessage] = useState('')
  const changed = useMemo(()=>JSON.stringify(draft)!==JSON.stringify(profile||{}),[draft,profile])
  const set = (patch)=>setDraft((p)=>({...p,...patch}))
  async function pickFile(e, kind, key){
    const file=e.target.files?.[0]
    if(!file)return
    const check=validateUpload(file, kind==='music'?'music':'image', kind==='music'?18:8)
    if(!check.ok){setMessage(check.message); return}
    setMessage('Uploading…')
    try{
      const url=await uploadUserFile(kind,user?.id,file)
      set({[key]:url, ...(kind==='music'?{music_source_type:'direct_audio', music_url:url, music_direct_url:url}: {})})
      setMessage('Upload ready. Click Save.')
    }catch{setMessage('Upload failed. Check Supabase bucket and policies.')}
  }
  async function save(){ setSaving(true); setMessage('Saving…'); const next={...draft}; setProfile?.(()=>next); const res=await saveProfile(next,user?.id); setSaving(false); setMessage(res?.ok?'Saved.':'Saved locally. Check Supabase if production save is needed.') }
  return (
    <V7DashboardShell user={user} profile={draft} active="Customize">
      <header className="pro-dash-hero pro-studio-head">
        <div><p className="pro-kicker">Customize studio</p><h1>Bangun profile publik yang fokus dan premium.</h1><p>Edit identitas, background, music, layout, dan visibility. Preview langsung kelihatan di samping.</p></div>
        <div className="pro-actions"><button className="pro-btn secondary" onClick={()=>setDraft(profile||{})}>Reset</button><button className="pro-btn primary" onClick={save}>{saving?'Saving…':'Save changes'}</button></div>
      </header>
      {message && <p className="pro-note">{message}</p>}{changed && <p className="pro-note warn">Unsaved changes detected.</p>}
      <section className="pro-studio-layout">
        <main className="pro-panel">
          <div className="pro-panel-head"><h2>Profile identity</h2><span>Step 1</span></div>
          <div className="pro-form-grid">
            <label>Display name<input value={draft.display_name||''} onChange={(e)=>set({display_name:e.target.value})}/></label>
            <label>Username<input value={draft.username||''} onChange={(e)=>set({username:e.target.value.toLowerCase().replace(/[^a-z0-9._]/g,'')})}/></label>
            <label className="wide">Bio<textarea value={draft.bio||''} onChange={(e)=>set({bio:e.target.value})} maxLength={280}/></label>
            <label>Layout<select value={draft.layout_name||layouts[0]} onChange={(e)=>set({layout_name:e.target.value})}>{layouts.map(x=><option key={x}>{x}</option>)}</select></label>
            <label>Theme<select value={draft.theme_name||themes[0]} onChange={(e)=>set({theme_name:e.target.value})}>{themes.map(x=><option key={x}>{x}</option>)}</select></label>
            <label>Visibility<select value={draft.visibility||'public'} onChange={(e)=>set({visibility:e.target.value})}><option value="public">Public</option><option value="unlisted">Unlisted</option><option value="private">Private</option></select></label>
          </div>
          <div className="pro-panel-head"><h2>Media uploads</h2><span>Step 2</span></div>
          <div className="pro-upload-grid">
            <label><BrandIcon name="image" size={20}/>Upload Avatar<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e)=>pickFile(e,'avatar','avatar_url')}/></label>
            <label><BrandIcon name="image" size={20}/>Choose Background<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e)=>pickFile(e,'background','background_url')}/></label>
            <label><BrandIcon name="image" size={20}/>Add Gallery Photo<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e)=>pickFile(e,'gallery','gallery_preview_url')}/></label>
            <label><BrandIcon name="apple music" size={20}/>Upload Music<input type="file" accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg,audio/mp4,audio/m4a" onChange={(e)=>pickFile(e,'music','music_direct_url')}/></label>
          </div>
          <div className="pro-panel-head"><h2>Music mood</h2><span>Step 3</span></div>
          <div className="pro-form-grid">
            <label>Music title<input value={draft.music_title||''} onChange={(e)=>set({music_title:e.target.value})}/></label>
            <label>Artist<input value={draft.music_artist||''} onChange={(e)=>set({music_artist:e.target.value})}/></label>
            <label className="wide">Music URL<input value={draft.music_url||''} onChange={(e)=>set({music_url:e.target.value, music_source_type:e.target.value.match(/\.(mp3|wav|ogg|m4a)(\?|$)/i)?'direct_audio':'external_platform'})} placeholder="Direct audio or external platform link"/></label>
          </div>
        </main>
        <aside className="pro-preview-card">
          <div className="pro-preview-bg" style={draft.background_url?{backgroundImage:`url(${draft.background_url})`}:undefined}/>
          <div className="pro-preview-avatar">{draft.avatar_url?<img src={draft.avatar_url} alt="avatar"/>:String(draft.display_name||'T').slice(0,1)}</div>
          <small>@{draft.username||'bekiw'}</small><h3>{draft.display_name||'TULUS User'}</h3><p>{draft.bio||'A quiet profile space.'}</p>
          <a className="pro-btn secondary" href={`/${draft.username||'bekiw'}`}>Open public preview</a>
        </aside>
      </section>
    </V7DashboardShell>
  )
}
