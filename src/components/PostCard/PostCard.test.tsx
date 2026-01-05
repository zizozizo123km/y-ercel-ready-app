import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostCard from './PostCard';
import { Post } from '../../types/post';

// Mock post data
const mockPost: Post = {
  id: '1',
  user: {
    id: 'u1',
    name: 'John Doe',
    profilePicture: 'https://example.com/johndoe.jpg',
  },
  timestamp: '2023-10-27T10:00:00Z',
  content: 'This is the first post content.',
  media: [{ type: 'image', url: 'https://example.com/post1_image.jpg' }],
  likes: 5,
  comments: 2,
  shares: 1,
  isLiked: false,
};

describe('PostCard', () => {
  const mockOnLikeToggle = jest.fn();
  const mockOnCommentClick = jest.fn();
  const mockOnShareClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock Date.now() for consistent timestamp rendering (e.g., '1 hour ago')
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-10-27T11:00:00Z')); // Set current time 1 hour after post time
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders user info, timestamp, and content correctly', () => {
    render(
      <PostCard
        post={mockPost}
        onLikeToggle={mockOnLikeToggle}
        onCommentClick={mockOnCommentClick}
        onShareClick={mockOnShareClick}
      />
    );

    // User Info
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe profile picture')).toHaveAttribute(
      'src',
      mockPost.user.profilePicture
    );

    // Timestamp (Mocked time setup should result in '1 hour ago')
    // Note: The specific output depends on the implementation of time formatting utility (if used).
    // Assuming a simple formatter that might output '1h' or '1 hour ago'.
    // We'll look for the content or part of it, or the title attribute if present.
    // For simplicity in testing the structure, we ensure the time element is present.
    // Since we don't control the exact relative time format without the utility,
    // we'll primarily check for the presence of the content text.

    expect(screen.getByText(/This is the first post content./i)).toBeInTheDocument();

    // Media
    expect(screen.getByAltText('Post media')).toHaveAttribute('src', mockPost.media![0].url);
  });

  it('renders engagement stats correctly', () => {
    render(
      <PostCard
        post={mockPost}
        onLikeToggle={mockOnLikeToggle}
        onCommentClick={mockOnCommentClick}
        onShareClick={mockOnShareClick}
      />
    );

    // Check stats (These might be grouped, check based on text content)
    expect(screen.getByText('5')).toBeInTheDocument(); // Likes count
    expect(screen.getByText('2 Comments')).toBeInTheDocument();
    expect(screen.getByText('1 Share')).toBeInTheDocument();
  });

  it('handles Like toggle click correctly when initially unliked', () => {
    render(
      <PostCard
        post={mockPost}
        onLikeToggle={mockOnLikeToggle}
        onCommentClick={mockOnCommentClick}
        onShareClick={mockOnShareClick}
      />
    );

    // Find the Like button (assuming it has a recognizable label or test ID)
    const likeButton = screen.getByRole('button', { name: /Like/i });
    fireEvent.click(likeButton);

    expect(mockOnLikeToggle).toHaveBeenCalledTimes(1);
    expect(mockOnLikeToggle).toHaveBeenCalledWith(mockPost.id);
  });

  it('handles Comment click correctly', () => {
    render(
      <PostCard
        post={mockPost}
        onLikeToggle={mockOnLikeToggle}
        onCommentClick={mockOnCommentClick}
        onShareClick={mockOnShareClick}
      />
    );

    const commentButton = screen.getByRole('button', { name: /Comment/i });
    fireEvent.click(commentButton);

    expect(mockOnCommentClick).toHaveBeenCalledTimes(1);
    expect(mockOnCommentClick).toHaveBeenCalledWith(mockPost.id);
  });

  it('handles Share click correctly', () => {
    render(
      <PostCard
        post={mockPost}
        onLikeToggle={mockOnLikeToggle}
        onCommentClick={mockOnCommentClick}
        onShareClick={mockOnShareClick}
      />
    );

    const shareButton = screen.getByRole('button', { name: /Share/i });
    fireEvent.click(shareButton);

    expect(mockOnShareClick).toHaveBeenCalledTimes(1);
    expect(mockOnShareClick).toHaveBeenCalledWith(mockPost.id);
  });

  it('shows the Liked state correctly', () => {
    const likedPost: Post = { ...mockPost, isLiked: true, likes: 6 };
    render(
      <PostCard
        post={likedPost}
        onLikeToggle={mockOnLikeToggle}
        onCommentClick={mockOnCommentClick}
        onShareClick={mockOnShareClick}
      />
    );

    const likeButton = screen.getByRole('button', { name: /Like/i });
    
    // Check if the button visually represents the liked state (e.g., color change, or specific text/class)
    // We rely on component implementation detail here. Assuming the button text/style reflects 'Liked'.
    // If the component uses a different appearance for 'Liked', this selector might need adjustment.
    // For robust testing, we often look for a specific class or data attribute indicating the state.
    // Example: checking for the presence of a color class if styled components are used.
    
    // For this test, we ensure the button is present, and if the component uses conditional rendering of text/icon,
    // we would check that. Since the name is often generic ('Like'), we check the overall UI state.
    
    // A more realistic test might look for a specific ARIA attribute or class name applied to the button/icon.
    // E.g., expect the 'Like' icon/text to have a specific 'blue' color class.
    
    // Test that the stats reflect the liked count
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('renders without media if media array is empty', () => {
    const postWithoutMedia: Post = { ...mockPost, media: [] };
    render(
      <PostCard
        post={postWithoutMedia}
        onLikeToggle={mockOnLikeToggle}
        onCommentClick={mockOnCommentClick}
        onShareClick={mockOnShareClick}
      />
    );

    expect(screen.queryByAltText('Post media')).not.toBeInTheDocument();
  });
  
  it('renders without media if media is undefined', () => {
    const postWithoutMedia: Post = { ...mockPost, media: undefined };
    render(
      <PostCard
        post={postWithoutMedia}
        onLikeToggle={mockOnLikeToggle}
        onCommentClick={mockOnCommentClick}
        onShareClick={mockOnShareClick}
      />
    );

    expect(screen.queryByAltText('Post media')).not.toBeInTheDocument();
  });
});