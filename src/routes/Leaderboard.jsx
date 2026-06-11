import TulusNav from '../components/TulusNav.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'
const rows = ['bekiw','aulia','qiel','luna','raka','nara','velin','kairo','mika','sora','cinta','ray']
export default function Leaderboard() { return <V7GlowBackground><TulusNav/><section className="v100-board"><div className="v100-board-hero"><p className="v100-kicker">Leaderboard</p><h1>View top TULUS profiles.</h1><p>Top profile views in a clean, simple list.</p></div><div className="v100-rank-list">{rows.map((x,i)=><a className={i<3?'top':''} href={`/${x}`} key={x}><span>{i+1}</span><b>{x}</b><small>{(1895000 - i*62123).toLocaleString()} views</small></a>)}</div></section></V7GlowBackground> }
