import React, { useState } from 'react';
import './App.css'; // For styling, though we'll define inline styles for simplicity

// Mock data structures
interface User {
  id: number;
  name: string;
  avatarUrl: string;
}

interface Post {
  id: number;
  user: User;
  timestamp: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  user: User;
  content: string;
}

// Mock Database (In a real app, this would come from an API/Redux store)
const currentUser: User = {
  id: 1,
  name: "Jane Doe",
  avatarUrl: "https://i.pravatar.cc/150?img=1"
};

const mockUsers: User[] = [
  currentUser,
  { id: 2, name: "John Smith", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Alice Johnson", avatarUrl: "https://i.pravatar.cc/150?img=3" },
];

const initialPosts: Post[] = [
  {
    id: 101,
    user: mockUsers[1],
    timestamp: "2 hours ago",
    content: "Just finished a marathon coding session! Time for a break. #ReactJS",
    likes: 15,
    comments: [
      { id: 1, user: currentUser, content: "Great job! Keep up the good work." }
    ]
  },
  {
    id: 102,
    user: mockUsers[2],
    timestamp: "5 hours ago",
    content: "Check out this amazing sunset I captured!",
    imageUrl: "https://picsum.photos/600/400?random=1",
    likes: 42,
    comments: [
      { id: 2, user: mockUsers[1], content: "Wow, beautiful shot!" },
      { id: 3, user: currentUser, content: "Incredible colors!" }
    ]
  }
];

// --- Components ---

// Shared Styles
const theme = {
  primary: '#1877f2', // Facebook Blue
  lightGray: '#f0f2f5', // Background color
  mediumGray: '#606770', // Text color
  darkGray: '#050505',
  borderRadius: '8px',
  padding: '16px',
};

const Avatar: React.FC<{ url: string, size?: number }> = ({ url, size = 40 }) => (
  <img
    src={url}
    alt="Avatar"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      objectFit: 'cover',
    }}
  />
);

const Button: React.FC<{ icon: React.ReactNode, text: string, onClick: () => void, color?: string }> = ({ icon, text, onClick, color }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      padding: '8px 4px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      borderRadius: theme.borderRadius,
      transition: 'background-color 0.2s',
      color: color || theme.mediumGray,
      fontSize: '15px',
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f2f2f2')}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
  >
    <span style={{ marginRight: '8px', fontSize: '20px' }}>{icon}</span>
    {text}
  </button>
);

// --- Header Component ---
const Header: React.FC = () => (
  <div style={{
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, .1)',
    padding: '8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    {/* Left - Logo and Search */}
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <svg height="40" viewBox="0 0 512 512" width="40" xmlns="http://www.w3.org/2000/svg">
        <path fill={theme.primary} d="M449.445,0H62.555C27.994,0,0,27.994,0,62.555v386.89C0,484.006,27.994,512,62.555,512h386.89C484.006,512,512,484.006,512,449.445V62.555C512,27.994,484.006,0,449.445,0z" />
        <path fill="#fff" d="M366.177,118.667h-40.669c-2.18,0-3.32,1.353-3.32,3.32v34.415h77.632l-9.102,77.534h-68.53v187.587h-78.682V233.936H163.535v-77.534h71.861v-52.09c0-50.315,26.438-78.019,79.062-78.019c23.08,0,38.385,1.96,44.208,2.836V118.667z" />
      </svg>
      <input
        type="text"
        placeholder="Search Facebook"
        style={{
          marginLeft: '10px',
          padding: '8px 12px',
          borderRadius: '20px',
          border: 'none',
          backgroundColor: theme.lightGray,
          width: '240px',
        }}
      />
    </div>

    {/* Center - Navigation Icons (Simplified) */}
    <div style={{ display: 'flex', gap: '30px' }}>
      <i className="fas fa-home" style={{ color: theme.primary, fontSize: '24px', cursor: 'pointer' }}></i>
      <i className="fas fa-tv" style={{ color: theme.mediumGray, fontSize: '24px', cursor: 'pointer' }}></i>
      <i className="fas fa-store" style={{ color: theme.mediumGray, fontSize: '24px', cursor: 'pointer' }}></i>
      <i className="fas fa-users" style={{ color: theme.mediumGray, fontSize: '24px', cursor: 'pointer' }}></i>
      <i className="fas fa-gamepad" style={{ color: theme.mediumGray, fontSize: '24px', cursor: 'pointer' }}></i>
    </div>

    {/* Right - User and Action Icons */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '5px', borderRadius: '20px', transition: 'background-color 0.2s' }}
           onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.lightGray)}
           onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Avatar url={currentUser.avatarUrl} size={28} />
        <span style={{ marginLeft: '8px', fontWeight: '600', color: theme.darkGray }}>{currentUser.name.split(' ')[0]}</span>
      </div>
      {['fas fa-th', 'fab fa-facebook-messenger', 'fas fa-bell', 'fas fa-caret-down'].map((icon, index) => (
        <div key={index} style={{
          backgroundColor: theme.lightGray,
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <i className={icon} style={{ fontSize: '18px', color: theme.darkGray }}></i>
        </div>
      ))}
    </div>
  </div>
);

// --- Create Post Input Component ---
const CreatePost: React.FC<{ onCreate: (content: string) => void }> = ({ onCreate }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onCreate(content);
      setContent('');
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: theme.borderRadius,
      boxShadow: '0 1px 2px rgba(0, 0, 0, .2)',
      padding: theme.padding,
      marginBottom: '20px',
      maxWidth: '500px',
      margin: '0 auto 20px auto'
    }}>
      {/* Top Input Area */}
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${theme.lightGray}`, paddingBottom: '10px', marginBottom: '10px' }}>
        <Avatar url={currentUser.avatarUrl} />
        <input
          type="text"
          placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          style={{
            flexGrow: 1,
            marginLeft: '10px',
            padding: '10px 15px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: theme.lightGray,
            fontSize: '16px',
            cursor: 'pointer',
          }}
        />
      </div>

      {/* Bottom Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          icon={<i className="fas fa-video" style={{ color: '#f3425f' }}></i>}
          text="Live Video"
          onClick={() => alert('Live Video feature not implemented')}
        />
        <Button
          icon={<i className="fas fa-images" style={{ color: '#45bd62' }}></i>}
          text="Photo/Video"
          onClick={() => alert('Photo/Video feature not implemented')}
        />
        <Button
          icon={<i className="fas fa-smile" style={{ color: '#ffba49' }}></i>}
          text="Feeling/Activity"
          onClick={() => handleSubmit()} // Use feeling/activity button to submit text post for simplicity
        />
      </div>
    </div>
  );
};

// --- Single Post Component ---
const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  const [currentPost, setCurrentPost] = useState(post);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentPost(p => ({
      ...p,
      likes: p.likes + (isLiked ? -1 : 1)
    }));
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        user: currentUser,
        content: newComment.trim()
      };
      setCurrentPost(p => ({
        ...p,
        comments: [...p.comments, comment]
      }));
      setNewComment('');
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: theme.borderRadius,
      boxShadow: '0 1px 2px rgba(0, 0, 0, .2)',
      marginBottom: '15px',
      maxWidth: '500px',
      margin: '0 auto 15px auto',
    }}>
      {/* Post Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: theme.padding, paddingBottom: '10px' }}>
        <Avatar url={currentPost.user.avatarUrl} size={40} />
        <div style={{ marginLeft: '10px', flexGrow: 1 }}>
          <div style={{ fontWeight: '600', color: theme.darkGray }}>{currentPost.user.name}</div>
          <div style={{ fontSize: '12px', color: theme.mediumGray }}>
            {currentPost.timestamp} <i className="fas fa-globe-americas"></i>
          </div>
        </div>
        <i className="fas fa-ellipsis-h" style={{ color: theme.mediumGray, cursor: 'pointer' }}></i>
      </div>

      {/* Post Content */}
      <div style={{ padding: '0 16px 16px 16px', fontSize: '15px', whiteSpace: 'pre-wrap' }}>
        {currentPost.content}
      </div>

      {/* Post Image */}
      {currentPost.imageUrl && (
        <img
          src={currentPost.imageUrl}
          alt="Post media"
          style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
        />
      )}

      {/* Likes and Comments Summary */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px', fontSize: '13px', color: theme.mediumGray }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {currentPost.likes > 0 && (
            <>
              <span style={{ marginRight: '5px' }}>👍❤️</span>
              <span>{currentPost.likes}</span>
            </>
          )}
        </div>
        <div>
          {currentPost.comments.length} Comments
        </div>
      </div>

      <hr style={{ margin: '8px 16px', border: `none`, borderTop: `1px solid ${theme.lightGray}` }} />

      {/* Action Bar (Like, Comment, Share) */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 5px 5px 5px' }}>
        <Button
          icon={<i className={isLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>}
          text="Like"
          onClick={handleLike}
          color={isLiked ? theme.primary : theme.mediumGray}
        />
        <Button
          icon={<i className="far fa-comment-alt"></i>}
          text="Comment"
          onClick={() => console.log('Comment clicked')}
        />
        <Button
          icon={<i className="fas fa-share"></i>}
          text="Share"
          onClick={() => alert('Share clicked')}
        />
      </div>

      <hr style={{ margin: '0 16px', border: `none`, borderTop: `1px solid ${theme.lightGray}` }} />

      {/* Comments Section */}
      <div style={{ padding: theme.padding }}>
        {currentPost.comments.slice(-2).map(comment => (
          <div key={comment.id} style={{ display: 'flex', marginBottom: '10px' }}>
            <Avatar url={comment.user.avatarUrl} size={32} />
            <div style={{ marginLeft: '8px', backgroundColor: theme.lightGray, borderRadius: '15px', padding: '8px 12px', maxWidth: '85%' }}>
              <div style={{ fontWeight: '600', fontSize: '13px', color: theme.darkGray }}>{comment.user.name}</div>
              <div style={{ fontSize: '15px' }}>{comment.content}</div>
            </div>
          </div>
        ))}
        {currentPost.comments.length > 2 && (
             <div style={{ color: theme.mediumGray, fontSize: '13px', cursor: 'pointer', marginLeft: '40px', marginBottom: '10px' }}>
               View all {currentPost.comments.length} comments
             </div>
        )}

        {/* New Comment Input */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <Avatar url={currentUser.avatarUrl} size={32} />
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCommentSubmit();
            }}
            style={{
              flexGrow: 1,
              marginLeft: '8px',
              padding: '8px 15px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: theme.lightGray,
              fontSize: '15px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  const [posts, setPosts] = useState(initialPosts);

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: Date.now(),
      user: currentUser,
      timestamp: "Just now",
      content: content,
      likes: 0,
      comments: []
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div style={{ backgroundColor: theme.lightGray, minHeight: '100vh' }}>
      <Header />

      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
        {/* Left Sidebar (Simplified - Navigation) */}
        <div style={{ width: '300px', padding: '0 20px', position: 'fixed', left: 0, top: 70, height: 'calc(100vh - 70px)', overflowY: 'auto' }}>
          {[
            { icon: <i className="fas fa-user-friends" style={{ color: theme.primary }}></i>, text: "Friends" },
            { icon: <i className="fas fa-clock" style={{ color: theme.primary }}></i>, text: "Memories" },
            { icon: <i className="fas fa-bookmark" style={{ color: 'purple' }}></i>, text: "Saved" },
            { icon: <i className="fas fa-flag" style={{ color: 'orange' }}></i>, text: "Pages" },
            { icon: <i className="fas fa-calendar-alt" style={{ color: 'red' }}></i>, text: "Events" },
          ].map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', cursor: 'pointer', borderRadius: '8px' }}
                 onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.lightGray)}
                 onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span style={{ fontSize: '24px', width: '30px', textAlign: 'center' }}>{item.icon}</span>
              <span style={{ marginLeft: '10px', fontWeight: '500' }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Center Content (Feed) */}
        <div style={{ width: '600px', margin: '0 300px 0 300px' }}>
          <CreatePost onCreate={handleCreatePost} />
          {posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>

        {/* Right Sidebar (Simplified - Contacts) */}
        <div style={{ width: '300px', padding: '0 20px', position: 'fixed', right: 0, top: 70, height: 'calc(100vh - 70px)', overflowY: 'auto' }}>
          <div style={{ fontWeight: '600', color: theme.mediumGray, marginBottom: '10px' }}>Contacts</div>
          {mockUsers.map(user => user.id !== currentUser.id && (
            <div key={user.id} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', cursor: 'pointer', borderRadius: '8px' }}
                 onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.lightGray)}
                 onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ position: 'relative' }}>
                <Avatar url={user.avatarUrl} size={32} />
                <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', backgroundColor: '#31a24c', borderRadius: '50%', border: '2px solid white' }}></span>
              </div>
              <span style={{ marginLeft: '10px', fontWeight: '500' }}>{user.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;