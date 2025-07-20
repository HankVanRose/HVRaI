import { Avatar } from '@mui/material';
import './Spinner.css'

export default function Spinner() {
  return (
    <Avatar sx={{ width: 120, height: 120, mb: 2, background: 'none' }}>
      {' '}
      <div className="orbit-spinner">
        <div className="orbit"></div>
        <div className="orbit"></div>
        <div className="orbit"></div>
      </div>
    </Avatar>
  );
}
