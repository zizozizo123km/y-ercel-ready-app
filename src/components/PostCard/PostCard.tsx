import React from 'react';

// NOTE: Assuming Post interface is defined globally or imported from '@/types/Post'
interface Post {
  id: number;
  author: {
    id: number;
    name: string;
    avatarUrl: string;
  };
  timestamp: string;
  content: string;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
}

interface PostCardProps {
  post: Post;
}

// Helper component for action buttons (Like, Comment, Share)
const PostActionButton: React.FC<{ icon: React.ReactNode, label: string, active?: boolean }> = ({ icon, label, active = false }) => (
  <button 
    className={`flex items-center justify-center p-2 rounded-lg transition-colors flex-1 ${
      active ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-100'
    }`}
    onClick={() => console.log(`${label} clicked`)}
  >
    {icon}
    <span className="ml-2 font-semibold text-sm">{label}</span>
  </button>
);

// Placeholder Icons (simplified SVGs mimicking Facebook/Heroicons style)
const IconLike = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.765a2 2 0 011.789 2.894l-3.32 6.641a2 2 0 01-1.789 1.055h-4.765M14 10v4m0 0H8m6 0v4m-4-4V7m4 4v4m0-4h4.765" /></svg>;
const IconLikeFilled = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.5-6.5a.5.5 0 011 0V11h3a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5v-1z" clipRule="evenodd" /></svg>;
const IconComment = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.111A9.957 9.957 0 0112 21c4.97 0 9-3.582 9-8s-4.03-8-9-8-9 3.582-9 8h2" /></svg>;
const IconShare = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.882 13.064 9 12.71 9 12c0-.71-.118-1.342-.316-1.66A.997.997 0 008 10h-.684A1 1 0 007 10.342C6.802 10.66 6.684 11.31 6.684 12c0 .71.118 1.342.316 1.66A.997.997 0 008 14h.684A1 1 0 008.684 13.342zM12 21c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" /></svg>;
const IconDots = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" /></svg>;
const IconWorld = <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h4A2.5 2.5 0 0017 5.5V3.935m4.945 2.11L18 7.385m-1.045 2.766L15.3 11.45M12 7l1.045 2.766M12 7h.01" /></svg>;


const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { author, timestamp, content, imageUrl, likesCount, commentsCount, sharesCount, isLiked = false } = post;

  const reactionCountDisplay = likesCount > 0 ? (
    <div className="flex items-center">
      {/* Mocking Facebook's small reaction bar */}
      <div className="flex items-center -space-x-1.5 mr-2">
        <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs border border-white p-0.5">👍</span>
      </div>
      <span>{likesCount}</span>
    </div>
  ) : null;

  return (
    <div className="bg-white shadow-md rounded-xl mb-4 w-full">
      
      {/* Post Header */}
      <div className="p-4 flex justify-between items-start">
        <div className="flex items-start">
          <img 
            className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0" 
            src={author.avatarUrl} 
            alt={author.name} 
          />
          <div>
            <p className="font-bold text-gray-900 leading-tight hover:underline cursor-pointer">{author.name}</p>
            <div className="flex items-center text-xs text-gray-500 mt-0.5">
              <span>{timestamp}</span>
              <span className="mx-1.5">•</span>
              {IconWorld}
            </div>
          </div>
        </div>
        <button className="text-gray-500 hover:bg-gray-100 rounded-full p-2 ml-2">
          {IconDots}
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{content}</p>
      </div>

      {/* Post Image/Media */}
      {imageUrl && (
        <div className="mt-2">
          <img 
            className="w-full object-cover max-h-[500px]" 
            src={imageUrl} 
            alt="Post content" 
          />
        </div>
      )}

      {/* Stats and Counters */}
      <div className="px-4 pt-3 pb-2 flex justify-between items-center text-sm text-gray-500">
        {reactionCountDisplay}
        <div className="flex space-x-3">
          {commentsCount > 0 && <span className="hover:underline cursor-pointer">{commentsCount} Comments</span>}
          {sharesCount > 0 && <span className="hover:underline cursor-pointer">{sharesCount} Shares</span>}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-gray-200"></div>

      {/* Action Bar (Like, Comment, Share) */}
      <div className="p-1.5 flex justify-around">
        <PostActionButton 
          icon={isLiked ? <span className="text-blue-600">{IconLike}</span> : IconLike} 
          label="Like" 
          active={isLiked}
        />
        <PostActionButton icon={IconComment} label="Comment" />
        <PostActionButton icon={IconShare} label="Share" />
      </div>
    </div>
  );
};

export default PostCard;