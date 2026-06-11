import { useRef, useState } from 'react';
import { validateFile } from '../utils/validation.js';

export default function FileUploader({ label, kind = 'image', accept = 'image/*', multiple = false, onFiles }) {
  const ref = useRef(null);
  const [preview, setPreview] = useState(null);
  const [state, setState] = useState({ status: 'idle', message: '' });

  const handleFiles = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const checks = files.map((file) => validateFile(file, kind));
    const bad = checks.find((check) => !check.ok);
    if (bad) {
      setState({ status: 'error', message: bad.message });
      return;
    }
    const first = files[0];
    setPreview(URL.createObjectURL(first));
    setState({ status: 'success', message: multiple ? `${files.length} file ready.` : `${first.name} ready.` });
    onFiles?.(files);
  };

  return (
    <div className="uploader-card">
      <button className="glass-btn full" type="button" onClick={() => ref.current?.click()}>{label}</button>
      <input ref={ref} hidden type="file" accept={accept} multiple={multiple} onChange={handleFiles} />
      {preview && kind !== 'music' && <img className="upload-preview" src={preview} alt="File preview" />}
      {preview && kind === 'music' && <audio className="audio-preview" src={preview} controls />}
      {state.message && <small className={`upload-state ${state.status}`}>{state.message}</small>}
    </div>
  );
}
