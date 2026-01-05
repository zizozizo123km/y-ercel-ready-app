import React, { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchNewsfeed, createPost } from '../../redux/slices/newsfeedSlice';
import { fetchProfileDetails } from '../../redux/slices/authSlice';
import Header from '../../components/Header/Header';
import SidebarLeft from '../../components/SidebarLeft/SidebarLeft';
import SidebarRight from '../../components/SidebarRight/SidebarRight';
import Newsfeed from '../../components/Newsfeed/Newsfeed';
import PostCreator from '../../components/PostCreator/PostCreator';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const HomePage: FC = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state: RootState) => state.newsfeed);
  const { user, isAuthenticated, loading: authLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Fetch profile details if not already loaded (useful on first load/refresh)
    if (isAuthenticated && !user) {
      dispatch(fetchProfileDetails());
    }
    // Fetch newsfeed
    dispatch(fetchNewsfeed());
  }, [dispatch, isAuthenticated, user]);

  const handlePostCreation = (content: string) => {
    if (user) {
      // Dummy logic for post creation - replace with actual API call payload
      const newPostData = {
        userId: user.id,
        content: content,
      };
      dispatch(createPost(newPostData));
    } else {
      console.error("User not logged in or profile not loaded.");
      // Handle scenario where user is trying to post but profile data is missing
    }
  };

  if (authLoading || (!isAuthenticated && user === null)) {
    // Show loading spinner while determining auth status/fetching user data
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>فيسبوك</title>
      </Helmet>
      <Header />
      
      <div className="flex justify-center bg-gray-100 min-h-screen pt-[56px]"> {/* pt-[56px] to offset fixed Header */}
        
        {/* Left Sidebar */}
        <div className="hidden lg:block w-[360px] fixed top-[56px] left-0 h-[calc(100vh-56px)] overflow-y-auto">
          <SidebarLeft user={user} />
        </div>

        {/* Main Content Area (Newsfeed + Post Creator) */}
        <main className="w-full max-w-[1280px] px-0 lg:px-4 flex justify-center">
          <div className="flex flex-col items-center w-full lg:w-[680px] xl:w-[600px] mt-4">
            
            {/* Post Creator */}
            {isAuthenticated && user && (
              <PostCreator 
                userProfilePic={user.profilePictureUrl || '/assets/default_avatar.png'} // Use default avatar if none provided
                userName={user.name}
                onCreatePost={handlePostCreation}
              />
            )}
            
            {/* Newsfeed */}
            {loading && !posts.length && <LoadingSpinner />}
            {error && <div className="text-red-500 p-4">حدث خطأ أثناء تحميل الموجز: {error}</div>}
            
            <Newsfeed posts={posts} loading={loading} />
            
          </div>
        </main>
        
        {/* Right Sidebar */}
        <div className="hidden xl:block w-[360px] fixed top-[56px] right-0 h-[calc(100vh-56px)] overflow-y-auto">
          <SidebarRight />
        </div>
      </div>
    </>
  );
};

export default HomePage;