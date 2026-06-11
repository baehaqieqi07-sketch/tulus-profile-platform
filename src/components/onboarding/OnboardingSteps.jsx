import PickNameStep from './PickNameStep.jsx'
import ChooseVibeStep from './ChooseVibeStep.jsx'
import AddMusicStep from './AddMusicStep.jsx'
import EnterSpaceStep from './EnterSpaceStep.jsx'

export default function OnboardingSteps({ step, profile, setProfile, onEnter }) {
  if (step === 0) return <PickNameStep profile={profile} setProfile={setProfile} />
  if (step === 1) return <ChooseVibeStep profile={profile} setProfile={setProfile} />
  if (step === 2) return <AddMusicStep profile={profile} setProfile={setProfile} />
  return <EnterSpaceStep onEnter={onEnter} />
}
