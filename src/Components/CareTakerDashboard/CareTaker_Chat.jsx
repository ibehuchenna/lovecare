import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Paper,
  Divider,
  Avatar,
  Grid,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f4f6f8',
  borderRadius: 10,
}));

const MessageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderRadius: 10,
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(1),
}));

const InputBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  backgroundColor: '#fff',
  borderRadius: 10,
  boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
}));

const CareRecieverChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  // Placeholder participant data
  const participant = {
    name: 'John Doe',
    avatar: '/path/to/participant-avatar.png',
    status: 'Online',
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: 'You', avatar: '/path/to/your-avatar.png' }]);
      setInputValue('');
    }
  };

  const handleGoBack = () => {
    navigate("/CareTaker-dashboard");
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#eceff1' }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={handleGoBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, overflow: 'auto', padding: 2 }}>
        <StyledPaper elevation={3}>
          {/* Participant Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, marginBottom: 2 }}>
            <Avatar src={participant.avatar} sx={{ marginRight: 2, width: 56, height: 56 }} />
            <Box>
              <Typography variant="h6">{participant.name}</Typography>
              <Typography variant="body2" color="textSecondary">{participant.status}</Typography>
            </Box>
          </Box>
          <Divider sx={{ marginBottom: 2 }} />

          {/* Message List */}
          <List sx={{ flexGrow: 1, overflow: 'auto', paddingBottom: 2 }}>
            {messages.map((message, index) => (
              <MessageBox key={index} sx={{ justifyContent: message.sender === 'You' ? 'flex-end' : 'flex-start' }}>
                {message.sender !== 'You' && <Avatar src={message.avatar} sx={{ marginRight: 1 }} />}
                <ListItemText primary={message.text} secondary={message.sender} />
                {message.sender === 'You' && <Avatar src="/path/to/your-avatar.png" sx={{ marginLeft: 1 }} />}
              </MessageBox>
            ))}
          </List>
          <Divider sx={{ marginBottom: 2 }} />
          <InputBox>
            <TextField
              variant="outlined"
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              sx={{ marginRight: 1 }}
            />
            <IconButton color="primary" onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
          </InputBox>
        </StyledPaper>
      </Box>
    </Box>
  );
};

export default CareRecieverChat;
