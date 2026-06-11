export default function Toast({ items = [], onClose }) {
  return (
    <div className="toast-stack">
      {items.map((item) => (
        <button type="button" className={`toast ${item.type || 'info'}`} key={item.id} onClick={() => onClose?.(item.id)}>
          <b>{item.title}</b>
          <span>{item.message}</span>
        </button>
      ))}
    </div>
  );
}
