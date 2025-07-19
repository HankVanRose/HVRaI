import { Box, Typography, TextField, IconButton, Paper, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

const ChatBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  maxWidth: 800,
  margin: '0 auto',
  padding: 24,
  backgroundColor: '#f5f7fa',
});

const WelcomeCard = styled(Paper)({
  padding: 24,
  marginBottom: 24,
  borderRadius: 16,
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
});

const TopicCard = styled(Paper)({
  padding: 16,
  marginBottom: 16,
  borderRadius: 12,
  backgroundColor: '#ffffff',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
  },
});

export const ChatContainer = () => {
  return (
    <ChatBox>
      <WelcomeCard>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>A</Avatar>
          <Typography variant="h6" fontWeight="bold">Hi, Asal Design</Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Ready to assist you with anything you need, from answering questions to providing recommendations. Let's get started!
        </Typography>
      </WelcomeCard>

      <Typography variant="subtitle1" fontWeight="bold" mb={2}>Suggested Topics</Typography>

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

      <Box mt={4} display="flex" alignItems="center">
        <TextField
          fullWidth
          placeholder="Ask SayHalo anything..."
          variant="outlined"
          size="medium"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              backgroundColor: '#ffffff',
            },
          }}
        />
        <IconButton color="primary" sx={{ ml: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </ChatBox>
  );
};