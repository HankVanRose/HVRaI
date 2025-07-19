import { Box, Typography, TextField, IconButton, Paper, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

const WelcomeCard = styled(Paper)({
  padding: 24,
  margin: 24,
  borderRadius: 16,
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
});

const TopicCard = styled(Paper)({
  padding: 16,
  margin: '16px 24px',
  borderRadius: 12,
  backgroundColor: '#ffffff',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
  },
});

export const MainChatArea = () => {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#f5f7fa',
    }}>
      <WelcomeCard>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>A</Avatar>
          <Typography variant="h6" fontWeight="bold">Hi, Asal Design</Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Ready to assist you with anything you need, from answering questions to providing recommendations. Let's get started!
        </Typography>
      </WelcomeCard>

      <Typography variant="subtitle1" fontWeight="bold" sx={{ ml: 3 }}>Suggested Topics</Typography>

      <TopicCard>
        <Typography variant="subtitle2" fontWeight="bold" color="primary">Wanderlust Destinations 2024</Typography>
        <Typography variant="caption" color="text.secondary">Must-Visit Places</Typography>
      </TopicCard>

      <TopicCard>
        <Typography variant="subtitle2" fontWeight="bold" color="primary">SayHalo At: What Sets Us Apart</Typography>
        <Typography variant="caption" color="text.secondary">Key Differentiators</Typography>
      </TopicCard>

      <TopicCard>
        <Typography variant="subtitle2" fontWeight="bold" color="primary">Design Trends on TikTok 2024</Typography>
        <Typography variant="caption" color="text.secondary">Trending Now</Typography>
      </TopicCard>

      <Box sx={{ 
        p: 2, 
        mt: 'auto',
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)'
      }}>
        <Box display="flex" alignItems="center">
          <TextField
            fullWidth
            placeholder="Ask SayHalo anything..."
            variant="outlined"
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 12,
                backgroundColor: '#f5f7fa',
              },
            }}
          />
          <IconButton color="primary" sx={{ ml: 1 }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};