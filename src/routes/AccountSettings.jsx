import { useState } from 'react'
import V7DashboardShell from '../components/V7DashboardShell.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import BrandIcon from '../components/BrandIcon.jsx'
import { getInitialLang } from '../lib/i18n.js'
export default function AccountSettings({ user, profile }) {
  const [lang, setLang] = useState(getInitialLang())
  return <V7DashboardShell user={user} profile={profile} active="Settings"><section className="v500-settings"><p className="v100-kicker">Account Settings</p><h1>Control your account without confusion.</h1><p>Identity, language, connections, security, and danger zone are grouped clearly.</p><div className="v500-settings-grid"><article><h2>General</h2><label>Username<input defaultValue={profile?.username || 'bekiw'} /></label><label>Display name<input defaultValue={profile?.display_name || 'bekiw'} /></label><label>Email<input defaultValue={user?.email || 'baehaqieqi07@gmail.com'} /></label><button>Save account</button></article><article><h2>Language</h2><p>Choose dashboard language. Public profile labels follow this setting.</p><LanguageSwitcher value={lang} onChange={setLang} /></article><article><h2>Connections</h2><button><BrandIcon name="google"/> Connect Google</button><button><BrandIcon name="discord"/> Connect Discord</button></article><article><h2>Security</h2><label><input type="checkbox" defaultChecked/> Turnstile on sensitive actions</label><label><input type="checkbox"/> Email login alerts</label><button>Change password</button></article><article className="danger"><h2>Danger zone</h2><button>Disable account</button><button>Delete account</button></article></div></section></V7DashboardShell>
}
