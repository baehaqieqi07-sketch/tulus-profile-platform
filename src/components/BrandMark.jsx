export default function BrandMark({ size = 42 }) {
  return (
    <span className="brand-mark" style={{ width: size, height: size }} aria-hidden="true">
      <span className="brand-mark__orbit" />
      <span className="brand-mark__t">T</span>
      <span className="brand-mark__spark" />
    </span>
  );
}
