import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from 'react-router-dom';
 
import { ProfileButton } from '../atom/ProfileButton';
import ava from '../../assets/ava.jpg';
import UserStore from '../../stores/UserStore';

interface UserProfileMenuProps {
  open: boolean;
}

export const UserProfileMenu = ({ open }: UserProfileMenuProps) => {
  const navigate = useNavigate();
  const user = UserStore.user;

  const handleLogout = async (closeMenu: () => void) => {
    try {
      await UserStore.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      closeMenu();
    }
  };

  return (
    <PopupState variant="popover" popupId="avatar-menu">
      {(popupState) => (
        <>
          {open ? (
            <Box
              {...bindTrigger(popupState)}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
              }}
            >
              <ProfileButton>
                <Avatar
                  src={ava}
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#4a6cf7',
                    fontSize: '1rem',
                    fontWeight: 700,
                  }}
                >
                  {user?.userName?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography
                  component={'div'}
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    color: 'text.secondary',
                  }}
                >
                  Профиль
                </Typography>
              </ProfileButton>
            </Box>
          ) : (
            <Box
              {...bindTrigger(popupState)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
              }}
            >
              <Avatar
                src={ava}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: '#4a6cf7',
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                {user?.userName?.charAt(0).toUpperCase()}
              </Avatar>
            </Box>
          )}

          <Menu {...bindMenu(popupState)}>
            <MenuItem
              sx={{ background: 'var(--fancy-gradient)' }}
              onClick={() => {
                navigate('/userprofile');
                popupState.close();
              }}
            >
              Профиль
            </MenuItem>
            <MenuItem onClick={() => handleLogout(popupState.close)}>
              Выйти
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
};