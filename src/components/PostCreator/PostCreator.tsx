import React, { useState, useContext } from 'react';
import { Avatar, Button, Paper, TextField, Typography, IconButton } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PublicIcon from '@mui/icons-material/Public';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Mock context/data for user info (replace with actual context/ Zustand/Redux if needed)
const MockUserContext = {
  user: {
    name: 'Jane Doe',
    avatarUrl: '/mock-avatar.jpg', // Replace with actual path or URL
  }
};

interface PostCreatorProps {
  onPostCreated: (postContent: string, mediaUrl?: string) => void;
}

const PostCreator: React.FC<PostCreatorProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  // Mock user data retrieval
  const { user } = MockUserContext;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setMediaFile(event.target.files[0]);
    }
  };

  const handlePostSubmit = async () => {
    if (!content.trim() && !mediaFile) {
      alert('Please enter content or select media.');
      return;
    }

    setIsPosting(true);
    let mediaUrl = undefined;

    try {
      // Simulate media upload (e.g., to a backend service like S3)
      if (mediaFile) {
        // In a real application, you would upload the file here
        console.log('Uploading media:', mediaFile.name);
        // For demonstration, we'll just use a placeholder URL
        mediaUrl = URL.createObjectURL(mediaFile); 
      }

      // Call the external handler
      onPostCreated(content, mediaUrl);

      // Clear the form
      setContent('');
      setMediaFile(null);

    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error display
    } finally {
      setIsPosting(false);
    }
  };

  const photoInputId = "photo-upload-input";
  const videoInputId = "video-upload-input";

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, marginBottom: 3, maxWidth: 500, marginX: 'auto' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        <Avatar src={user.avatarUrl} alt={user.name} sx={{ width: 40, height: 40, marginRight: 1.5 }} />
        <TextField
          multiline
          fullWidth
          variant="standard"
          placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          minRows={2}
          InputProps={{
            disableUnderline: true,
            sx: {
              borderRadius: 5,
              padding: '8px 15px',
              backgroundColor: '#f0f2f5',
              '&:hover': {
                backgroundColor: '#e4e6eb',
              }
            }
          }}
          sx={{
            '& .MuiInputBase-root': {
              padding: 0,
            }
          }}
        />
      </div>

      {/* Visibility Settings (Optional - mimics Facebook dropdown) */}
      <div style={{ marginBottom: 15 }}>
        <Button
          variant="contained"
          size="small"
          sx={{
            textTransform: 'none',
            backgroundColor: '#e4e6eb',
            color: '#050505',
            '&:hover': {
              backgroundColor: '#d8dadf',
            },
            borderRadius: 1.5,
          }}
          startIcon={<PublicIcon fontSize="small" />}
          endIcon={<ArrowDropDownIcon />}
        >
          Public
        </Button>
      </div>
      
      {/* Selected Media Preview (Simple Text) */}
      {mediaFile && (
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Selected Media: {mediaFile.name}
        </Typography>
      )}

      {/* Separator */}
      <hr style={{ border: '0.5px solid #f0f2f5', margin: '10px 0' }} />

      {/* Action Buttons Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Live Video */}
        <Button
          startIcon={<VideoCameraBackIcon color="error" />}
          sx={{ textTransform: 'none', color: '#050505' }}
        >
          Live Video
        </Button>

        {/* Photo/Video Upload */}
        <input
          accept="image/*,video/*"
          style={{ display: 'none' }}
          id={photoInputId}
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor={photoInputId}>
          <Button
            component="span"
            startIcon={<PhotoLibraryIcon color="success" />}
            sx={{ textTransform: 'none', color: '#050505' }}
          >
            Photo/Video
          </Button>
        </label>
        
        {/* Feeling/Activity */}
        <Button
          startIcon={<TagFacesIcon color="warning" />}
          sx={{ textTransform: 'none', color: '#050505' }}
        >
          Feeling/Activity
        </Button>

        {/* More Options (Mock) */}
        <IconButton size="small">
            <MoreHorizIcon />
        </IconButton>
      </div>

      {/* Post Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handlePostSubmit}
        disabled={isPosting || (!content.trim() && !mediaFile)}
        sx={{ marginTop: 2, borderRadius: 1.5 }}
      >
        {isPosting ? 'Posting...' : 'Post'}
      </Button>
    </Paper>
  );
};

export default PostCreator;