import { Button, styled } from '@mui/material';

export const ProfileButton = styled(Button)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  justifyItems: 'center',
  borderRadius: '10px',
  height: '45px',
  width: '145px',
  color: 'white',
  fontSize: '16px',
  textTransform: 'none',
 

  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0 2px 12px rgba(96, 96, 95, 0.5)',
  },
}));
