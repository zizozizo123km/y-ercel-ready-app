import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import {
    Heart, ThumbsUp, MessageCircle, Share2, MoreHorizontal, Maximize2, Minimize2,
    Volume2, VolumeX, Pause, Play, Settings, SkipForward, Rewind, Clock, ArrowLeft
} from 'lucide-react';

import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import CommentSection from '../../components/CommentSection/CommentSection';
import SuggestedVideos from '../../components/SuggestedVideos/SuggestedVideos';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import { useAuth } from '../../context/AuthContext';
import { fetchVideoDetails, postComment, likeVideo, fetchSuggestedVideos } from '../../api/api';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import TimeAgo from '../../components/TimeAgo/TimeAgo';

// --- Styled Components ---

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const WatchPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f0f2f5; /* Facebook light gray background */
`;

const ContentWrapper = styled.div`
    display: flex;
    flex: 1;
    margin-top: 56px; /* Offset for fixed Header */
`;

const MainContent = styled.main`
    flex: 3;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    max-width: 900px;
    margin: 0 auto; /* Center the main content area */

    @media (max-width: 1200px) {
        flex: 1;
        max-width: 100%;
        padding: 10px;
    }
`;

const VideoSection = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    animation: ${fadeIn} 0.5s ease-out;
`;

const VideoContainer = styled.div`
    position: relative;
    width: 100%;
    /* 16:9 Aspect Ratio */
    padding-top: 56.25%; 
    background-color: #000;
`;

const VideoDetails = styled.div`
    padding: 16px;
    border-top: 1px solid #e5e5e5;
`;

const VideoTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: #050505;
    margin-bottom: 8px;
`;

const ChannelInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 10px;
`;

const ChannelProfile = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const ChannelName = styled.span`
    font-weight: 600;
    margin-left: 10px;
    color: #050505;
    &:hover {
        text-decoration: underline;
    }
`;

const FollowButton = styled.button`
    background-color: #1877f2;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #166fe5;
    }
`;

const InteractionBar = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    border-top: 1px solid #e5e5e5;
    margin-top: 10px;
`;

interface InteractionButtonProps {
    $active?: boolean;
}

const InteractionButton = styled.button<InteractionButtonProps>`
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: #606770;
    font-size: 1rem;
    font-weight: 600;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

    svg {
        width: 24px;
        height: 24px;
        color: ${props => props.$active ? '#1877f2' : '#606770'};
    }

    &:hover {
        background-color: #f2f2f2;
    }

    ${props => props.$active && `
        color: #1877f2;
        &:hover {
            background-color: #e7f3ff;
        }
    `}
`;

const ViewsAndTime = styled.div`
    display: flex;
    gap: 15px;
    color: #606770;
    font-size: 0.9rem;
    margin-bottom: 10px;
`;

const SidebarWrapper = styled.aside`
    flex: 1;
    min-width: 350px;
    max-width: 400px;
    padding: 20px 20px 20px 0;
    height: calc(100vh - 56px);
    position: sticky;
    top: 56px;
    overflow-y: auto;

    @media (max-width: 1200px) {
        display: none; /* Hide suggested videos sidebar on smaller screens */
    }
`;

const LoadingSpinner = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid #1877f2;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 50px auto;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const ErrorMessage = styled.div`
    color: #f00;
    text-align: center;
    padding: 20px;
    font-size: 1.2rem;
`;

const BackButton = styled.button`
    display: none;
    align-items: center;
    gap: 5px;
    background: none;
    border: none;
    color: #1877f2;
    font-weight: 600;
    padding: 10px 0;
    cursor: pointer;

    @media (max-width: 768px) {
        display: flex;
    }
`;


// --- Types ---

interface VideoData {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    views: number;
    likes: number;
    isLiked: boolean;
    createdAt: string;
    channel: {
        id: string;
        name: string;
        profilePictureUrl: string;
    };
}

// --- Component ---

const WatchPage: React.FC = () => {
    const { videoId } = useParams<{ videoId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const [video, setVideo] = useState<VideoData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [suggestedVideos, setSuggestedVideos] = useState<any[]>([]);

    const fetchVideoData = useCallback(async (id: string) => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const videoDetails = await fetchVideoDetails(id);
            setVideo({
                ...videoDetails,
                // Mocking isLiked status for demonstration
                isLiked: videoDetails.isLiked || false, 
            });

            const suggested = await fetchSuggestedVideos(id);
            setSuggestedVideos(suggested);

        } catch (err) {
            console.error("Failed to fetch video details:", err);
            setError("تعذر تحميل الفيديو. قد يكون الرابط غير صحيح أو حدث خطأ في الشبكة.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (videoId) {
            fetchVideoData(videoId);
        }
    }, [videoId, fetchVideoData]);

    const handleLike = async () => {
        if (!video || !user) return;

        const newIsLiked = !video.isLiked;
        const newLikesCount = newIsLiked ? video.likes + 1 : video.likes - 1;

        setVideo(prev => prev ? { ...prev, isLiked: newIsLiked, likes: newLikesCount } : null);

        try {
            await likeVideo(video.id);
        } catch (e) {
            console.error("Failed to toggle like:", e);
            // Revert state if API call fails
            setVideo(prev => prev ? { ...prev, isLiked: !newIsLiked, likes: newLikesCount - (newIsLiked ? 2 : -2) } : null);
        }
    };

    const handlePostComment = async (content: string) => {
        if (!videoId || !user) return;
        
        try {
            // Note: In a real app, this should update the local comment state
            const newComment = await postComment(videoId, content);
            console.log("Comment posted:", newComment);
            // Optionally, refresh or prepend the new comment to the list
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const handleGoBack = () => {
        // If coming from the homepage, go back. Otherwise, default to home.
        if (location.key !== 'default') {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    if (loading) {
        return (
            <WatchPageContainer>
                <Header />
                <MainContent>
                    <LoadingSpinner />
                </MainContent>
            </WatchPageContainer>
        );
    }

    if (error || !video) {
        return (
            <WatchPageContainer>
                <Header />
                <MainContent>
                    <ErrorMessage>{error || "Video not found."}</ErrorMessage>
                </MainContent>
            </WatchPageContainer>
        );
    }

    const formatCount = (count: number) => {
        if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
        if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
        return count.toString();
    };

    return (
        <WatchPageContainer>
            <Header />
            <ContentWrapper>
                <MainContent>
                    <BackButton onClick={handleGoBack}>
                        <ArrowLeft size={20} />
                        رجوع
                    </BackButton>

                    {/* Video Player */}
                    <VideoSection>
                        <VideoContainer>
                            <VideoPlayer 
                                videoUrl={video.videoUrl} 
                                thumbnailUrl={video.thumbnailUrl}
                            />
                        </VideoContainer>

                        {/* Video Details */}
                        <VideoDetails>
                            <VideoTitle>{video.title}</VideoTitle>

                            <ViewsAndTime>
                                <span>{formatCount(video.views)} مشاهدة</span>
                                <span><TimeAgo timestamp={video.createdAt} /></span>
                            </ViewsAndTime>

                            <ChannelInfo>
                                <ChannelProfile onClick={() => navigate(`/profile/${video.channel.id}`)}>
                                    <ProfilePicture url={video.channel.profilePictureUrl} size={40} />
                                    <ChannelName>{video.channel.name}</ChannelName>
                                </ChannelProfile>
                                <FollowButton>
                                    + متابعة
                                </FollowButton>
                            </ChannelInfo>
                            
                            {/* Description/Interaction Divider */}
                            <p style={{ color: '#606770', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                                {video.description.substring(0, 150)}{video.description.length > 150 ? '... (شاهد المزيد)' : ''}
                            </p>

                            <InteractionBar>
                                <InteractionButton onClick={handleLike} $active={video.isLiked}>
                                    <ThumbsUp fill={video.isLiked ? '#1877f2' : 'none'} />
                                    <span>{formatCount(video.likes)}</span>
                                </InteractionButton>
                                <InteractionButton>
                                    <MessageCircle />
                                    <span>تعليق</span>
                                </InteractionButton>
                                <InteractionButton>
                                    <Share2 />
                                    <span>مشاركة</span>
                                </InteractionButton>
                                <InteractionButton>
                                    <MoreHorizontal />
                                </InteractionButton>
                            </InteractionBar>
                        </VideoDetails>
                    </VideoSection>

                    {/* Comment Section */}
                    <CommentSection 
                        videoId={videoId!} 
                        onCommentPost={handlePostComment}
                    />

                </MainContent>

                {/* Suggested Videos Sidebar */}
                <SidebarWrapper>
                    <SuggestedVideos videos={suggestedVideos} currentVideoId={videoId!} />
                </SidebarWrapper>
            </ContentWrapper>
        </WatchPageContainer>
    );
};

export default WatchPage;