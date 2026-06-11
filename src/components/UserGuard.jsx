export default function UserGuard({ user, children }) {
  if (!user) {
    return (
      <main className="auth-shell">
        <section className="auth-card glass-card">
          <p className="eyebrow">private space</p>
          <h1>Login first</h1>
          <p className="muted">Your dashboard is calm and private. Please login to continue.</p>
          <a className="primary-button" href="/login">Login</a>
        </section>
      </main>
    )
  }
  return children
}
