import UploadButton from './UploadButton.jsx'
export default function ImagePicker(props) { return <UploadButton label={props.label || 'Choose Image'} accept="image/*" onPick={props.onPick} /> }
