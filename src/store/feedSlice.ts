import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store'; // Assuming you have a store file defining RootState

// --- TYPE DEFINITIONS ---

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface ReactionCount {
  LIKE: number;
  LOVE: number;
  HA_HA: number;
  WOW: number;
  SAD: number;
  ANGRY: number;
}

export type ReactionType = keyof ReactionCount;

export interface Post {
  id: string;
  author: User;
  timestamp: string; // ISO string
  content: string;
  mediaUrl?: string; // URL for image/video
  mediaType?: 'image' | 'video';
  reactionCounts: ReactionCount;
  commentCount: number;
  shareCount: number;
  userReaction?: ReactionType | null; // The reaction the current user gave
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  timestamp: string;
  content: string;
}

export interface FeedState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentPage: number;
  hasMore: boolean;
}

// --- INITIAL STATE ---

const initialState: FeedState = {
  posts: [],
  status: 'idle',
  error: null,
  currentPage: 0,
  hasMore: true,
};

// --- ASYNC THUNKS ---

const API_BASE_URL = '/api/v1/feed';
const PAGE_SIZE = 10;

/**
 * Thunk to fetch a new page of feed posts.
 */
export const fetchFeedPosts = createAsyncThunk<
  Post[],
  number,
  { state: RootState }
>('feed/fetchFeedPosts', async (pageNumber: number, { rejectWithValue }) => {
  try {
    // Simulate API delay and structure
    const response = await axios.get(`${API_BASE_URL}/posts`, {
      params: { page: pageNumber, size: PAGE_SIZE },
    });
    return response.data.posts as Post[];
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('An unknown error occurred during fetch.');
  }
});

/**
 * Thunk to submit a reaction to a post.
 */
export const submitReaction = createAsyncThunk<
  { postId: string; newReaction: ReactionType | null; previousReaction: ReactionType | null },
  { postId: string; reactionType: ReactionType | null },
  { state: RootState }
>(
  'feed/submitReaction',
  async ({ postId, reactionType }, { getState, rejectWithValue }) => {
    // Find the current reaction status before making the API call (for optimistic update and rollback)
    const state = getState() as RootState;
    const post = state.feed.posts.find(p => p.id === postId);
    const previousReaction = post?.userReaction || null;

    try {
      await axios.post(`${API_BASE_URL}/posts/${postId}/react`, {
        reactionType, // null means unreact
      });

      return { postId, newReaction: reactionType, previousReaction };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          'Failed to submit reaction. Please try again.'
        );
      }
      return rejectWithValue('An unexpected error occurred.');
    }
  }
);


// --- SLICE ---

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    // Utility for optimistic UI updates in submitReaction extraReducer
    updatePostReaction(
      state,
      action: PayloadAction<{
        postId: string;
        newReaction: ReactionType | null;
        previousReaction: ReactionType | null;
      }>
    ) {
      const { postId, newReaction, previousReaction } = action.payload;
      const postIndex = state.posts.findIndex(p => p.id === postId);

      if (postIndex !== -1) {
        const post = state.posts[postIndex];

        // 1. Decrement previous reaction count if it existed
        if (previousReaction && post.reactionCounts[previousReaction] > 0) {
          post.reactionCounts[previousReaction] -= 1;
        }

        // 2. Increment new reaction count if it exists
        if (newReaction) {
          post.reactionCounts[newReaction] = (post.reactionCounts[newReaction] || 0) + 1;
        }

        // 3. Update user's current reaction state
        post.userReaction = newReaction;
      }
    },
    resetFeed(state) {
        state.posts = [];
        state.currentPage = 0;
        state.hasMore = true;
        state.status = 'idle';
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- fetchFeedPosts ---
      .addCase(fetchFeedPosts.pending, (state, action) => {
        // If loading page 0 (initial load or refresh), set status to loading
        if (action.meta.arg === 0) {
            state.status = 'loading';
            state.error = null;
        }
        // For subsequent pages, status remains 'succeeded' but we are fetching more
      })
      .addCase(fetchFeedPosts.fulfilled, (state, action) => {
        const newPosts = action.payload;
        const pageNumber = action.meta.arg;

        if (pageNumber === 0) {
          // Replace content for initial load/refresh
          state.posts = newPosts;
          state.status = 'succeeded';
        } else {
          // Append for subsequent pages
          state.posts.push(...newPosts);
        }

        if (newPosts.length === 0 || newPosts.length < PAGE_SIZE) {
          state.hasMore = false;
        }

        state.currentPage = pageNumber + 1;
      })
      .addCase(fetchFeedPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error.message || 'Failed to load feed.';
        state.hasMore = false; // Stop trying to load more if the last attempt failed
      })

      // --- submitReaction ---
      .addCase(submitReaction.pending, (state, action) => {
        const { postId, reactionType: newReaction } = action.meta.arg;

        // Optimistic Update: Use the defined reducer logic immediately
        const post = state.posts.find(p => p.id === postId);
        const previousReaction = post?.userReaction || null;

        if (post) {
            feedSlice.caseReducers.updatePostReaction(state, {
                payload: { postId, newReaction, previousReaction },
                type: 'feed/updatePostReaction',
            });
        }
      })
      .addCase(submitReaction.fulfilled, (state, action) => {
        // No action needed on success, the optimistic update is already correct.
        // If we expected the server to return the finalized post, we would update here.
      })
      .addCase(submitReaction.rejected, (state, action) => {
        const { postId, newReaction, previousReaction } = action.meta.arg as unknown as { postId: string; reactionType: ReactionType | null; };
        
        // Rollback: Revert the state change
        // We need to reverse the logic applied in the pending state
        
        // Reverse parameters (new becomes previous, previous becomes new)
        feedSlice.caseReducers.updatePostReaction(state, {
            payload: { postId, newReaction: previousReaction, previousReaction: newReaction },
            type: 'feed/updatePostReaction',
        });

        // Optionally, set error state specific to this action if UI needs to show an alert
        console.error('Reaction rollback performed:', action.payload || action.error.message);
      });
  },
});

export const { updatePostReaction, resetFeed } = feedSlice.actions;

// --- SELECTORS ---
export const selectAllPosts = (state: RootState) => state.feed.posts;
export const selectFeedStatus = (state: RootState) => state.feed.status;
export const selectHasMorePosts = (state: RootState) => state.feed.hasMore;
export const selectCurrentPage = (state: RootState) => state.feed.currentPage;

export default feedSlice.reducer;