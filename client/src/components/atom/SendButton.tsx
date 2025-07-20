import { Button, styled } from '@mui/material';

export const SendButton = styled(Button)(() => ({
  borderRadius: '50px',
  height: '45px',
  width: '105px',
  color: 'white',
  fontSize: '16px',
  textTransform: 'none',
  boxShadow: 'none',
  background: '#ffa435',
  cursor: 'pointer',

  '&:hover': {
    boxShadow: '0 2px 12px rgba(247, 149, 11, 0.5)',
  },
}));
