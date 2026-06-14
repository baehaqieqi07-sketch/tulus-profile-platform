import { V7GlowBackground, V7Card } from '../components/V7Shell.jsx'
import SignInCard from '../components/auth/SignInCard.jsx'
import TulusLogo from '../components/TulusLogo.jsx'
import SpaceBackground from '../components/SpaceBackground.jsx'
export default function Login({ onLogin, onProfilePatch, profile }) {
  return <><SpaceBackground /><V7GlowBackground className="v7-auth v500-auth"><V7Card className="v7-auth-card v500-login-card"><a className="v7-auth-logo" href="/"><TulusLogo compact /></a><p className="v100-kicker">Welcome back</p><h1>Log in to your TULUS account</h1><p>Access your profile, dashboard, links, music, premium settings, and bekiw help center from one clean account.</p><SignInCard onLogin={onLogin} onSuccess={() => { history.pushState(null,'','/account'); dispatchEvent(new PopStateEvent('popstate')) }} /><div className="v7-auth-foot"><span>New to TULUS?</span><a href="/register">Create an account</a></div></V7Card></V7GlowBackground></>
}
