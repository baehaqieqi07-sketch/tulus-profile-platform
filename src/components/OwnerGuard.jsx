import NotFound from '../routes/NotFound.jsx'

export default function OwnerGuard({ user, children }) {
  if (!user || user.role !== 'owner') return <NotFound quiet />
  return children
}
