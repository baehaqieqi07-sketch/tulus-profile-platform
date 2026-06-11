import { musicRecommendations } from '../../data/musicRecommendations.js'
import MusicRecommendationCard from './MusicRecommendationCard.jsx'

export default function MusicRecommendationList({ profile, onUse, onPreview }) {
  const active = musicRecommendations.filter((item) => item.is_active !== false).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  return (
    <div className="music-rec-list">
      {active.map((item) => <MusicRecommendationCard key={item.id} item={item} selected={profile.music_recommendation_id === item.id} onUse={onUse} onPreview={onPreview} />)}
    </div>
  )
}
