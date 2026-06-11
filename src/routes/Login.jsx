import { useState } from 'react'
import { V7GlowBackground, V7Card } from '../components/V7Shell.jsx'
import SignInCard from '../components/auth/SignInCard.jsx'
export default function Login({ onLogin, onProfilePatch, profile }) {
  return <V7GlowBackground className="v7-auth"><V7Card className="v7-auth-card"><a className="v7-auth-logo" href="/">✦</a><h1>Log in to your account</h1><p>Access your profile, links, and premium settings with the same account everywhere.</p><SignInCard onLogin={onLogin} onSuccess={() => { history.pushState(null,'','/account'); dispatchEvent(new PopStateEvent('popstate')) }} /><div className="v7-auth-foot"><span>New to TULUS?</span><a href="/register">Create an account</a></div></V7Card></V7GlowBackground>
}
