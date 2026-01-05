import React from 'react';
import './Feed.css';
import StorySection from '../StorySection/StorySection';
import PostComposer from '../PostComposer/PostComposer';
import Post from '../Post/Post'; // Assuming we have a Post component

const DUMMY_POSTS = [
  {
    id: 1,
    user: { name: 'Mona Mohamed', avatar: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=M', verified: true },
    timestamp: '5h',
    content: 'Just had the best coffee ever! ☕ Life is good.',
    image: null,
    likes: 154,
    comments: 32,
    shares: 10,
  },
  {
    id: 2,
    user: { name: 'Ahmed Hassan', avatar: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=A', verified: false },
    timestamp: '1d',
    content: 'Check out this stunning view from my recent trip!',
    image: 'https://via.placeholder.com/800x400?text=Mountain+View+Picture',
    likes: 589,
    comments: 105,
    shares: 45,
  },
  {
    id: 3,
    user: { name: 'Fatma Ali', avatar: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=F', verified: true },
    timestamp: '2d',
    content: 'Feeling productive today! Finished reading a great book.',
    image: null,
    likes: 98,
    comments: 15,
    shares: 5,
  },
];

const Feed: React.FC = () => {
  return (
    <div className="feed">
      {/* 1. Stories Section */}
      <StorySection />

      {/* 2. Post Composer (What's on your mind?) */}
      <PostComposer />

      {/* 3. Posts */}
      <div className="feed__posts">
        {DUMMY_POSTS.map(post => (
          <Post 
            key={post.id}
            user={post.user}
            timestamp={post.timestamp}
            content={post.content}
            image={post.image}
            likes={post.likes}
            comments={post.comments}
            shares={post.shares}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;