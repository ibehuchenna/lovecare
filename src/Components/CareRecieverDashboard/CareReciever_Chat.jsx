import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItemText,
  TextField,
  Paper,
  Divider,
  Avatar,
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
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the socket.io server
    const newSocket = io('https://lovecare-backend.onrender.com');
    setSocket(newSocket);

    // Fetch messages from API endpoint when component mounts
    fetchMessages();

    // Listen for messages from the server
    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the connection when the component unmounts
    return () => newSocket.close();
  }, []);

  const careReceiverId = localStorage.getItem('id'); // Retrieve receiverID from localStorage
  const careReceiverName = localStorage.getItem('name'); // Retrieve receiver name from localStorage

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('https://lovecare-backend.onrender.com/api/messages', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data); // Update state with fetched messages
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        text: inputValue,
        senderName: careReceiverName,
        senderId: careReceiverId,
        avatar: '../../assets/avatar-icon.png', // Ensure correct path to avatar
      };
      socket.emit('message', newMessage); // Send the message to the server
      // Note: Assuming the message is sent successfully, it will be added to state upon receiving back from the server
      setInputValue('');
    }
  };

  const handleGoBack = () => {
    navigate("/CareRecipent-dashboard");
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
            <Avatar src={'../../assets/avatar-icon.png'} sx={{ marginRight: 2, width: 56, height: 56 }} />
            <Box>
              <Typography variant="h6">{careReceiverName}</Typography>
              <Typography variant="body2" color="textSecondary">Online</Typography>
            </Box>
          </Box>
          <Divider sx={{ marginBottom: 2 }} />

          {/* Message List */}
          <List sx={{ flexGrow: 1, overflow: 'auto', paddingBottom: 2 }}>
            {messages.map((message, index) => (
              <MessageBox key={index} sx={{ justifyContent: message.senderId === careReceiverId ? 'flex-end' : 'flex-start' }}>
                {message.senderId !== careReceiverId && <Avatar src={message.avatar} sx={{ marginRight: 1 }} />}
                <ListItemText primary={message.text} secondary={message.senderName} />
                {message.senderId === careReceiverId && <Avatar src="/path/to/your-avatar.png" sx={{ marginLeft: 1 }} />}
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
