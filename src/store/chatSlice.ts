import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

// Define types for the application's domain objects
export interface Message {
  id: string;
  senderId: string;
  timestamp: number; // Unix timestamp
  text: string;
  status: 'sent' | 'delivered' | 'read' | 'sending' | 'failed';
  isSeen: boolean;
}

export interface Participant {
  id: string;
  name: string;
  avatarUrl: string;
  isOnline: boolean;
}

export interface Thread {
  id: string;
  participants: Participant[];
  messages: Message[];
  lastActivity: number; // Unix timestamp of the last message/activity
  unreadCount: number;
  type: 'one-to-one' | 'group';
  name?: string; // For groups
}

// Define the shape of the chat state
export interface ChatState {
  threads: { [key: string]: Thread };
  currentThreadId: string | null;
  currentUserId: string; // The ID of the logged-in user
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: ChatState = {
  threads: {},
  currentThreadId: null,
  currentUserId: 'user_1', // Mock logged-in user
  isLoading: false,
  error: null,
};

// Mock data generation helper (for initial setup)
const generateMockParticipants = (ids: string[]): Participant[] => [
  { id: 'user_1', name: 'You', avatarUrl: '/avatars/u1.jpg', isOnline: true },
  { id: 'user_2', name: 'Jane Doe', avatarUrl: '/avatars/u2.jpg', isOnline: true },
  { id: 'user_3', name: 'John Smith', avatarUrl: '/avatars/u3.jpg', isOnline: false },
].filter(p => ids.includes(p.id));

const generateMockMessages = (threadId: string, participants: Participant[]): Message[] => {
  const now = Date.now();
  const messages: Message[] = [
    {
      id: nanoid(), senderId: 'user_2', timestamp: now - 300000,
      text: 'Hey, how are you doing?', status: 'read', isSeen: true
    },
    {
      id: nanoid(), senderId: 'user_1', timestamp: now - 240000,
      text: 'I\'m doing great, thanks! What about you?', status: 'read', isSeen: true
    },
    {
      id: nanoid(), senderId: 'user_2', timestamp: now - 180000,
      text: 'Just working on the new feature rollout. It\'s intense!', status: 'delivered', isSeen: false
    },
    {
      id: nanoid(), senderId: 'user_1', timestamp: now - 60000,
      text: 'Sounds busy! Good luck with that.', status: 'sent', isSeen: false
    },
  ];
  return messages;
};

// Mock Initial State Setup
const thread1Id = 't_1';
const thread2Id = 't_2';

const participants1 = generateMockParticipants(['user_1', 'user_2']);
const messages1 = generateMockMessages(thread1Id, participants1);

const participants2 = generateMockParticipants(['user_1', 'user_3']);
const messages2 = generateMockMessages(thread2Id, participants2);

initialState.threads[thread1Id] = {
  id: thread1Id,
  participants: participants1,
  messages: messages1,
  lastActivity: messages1[messages1.length - 1].timestamp,
  unreadCount: 0,
  type: 'one-to-one',
};

initialState.threads[thread2Id] = {
  id: thread2Id,
  participants: participants2,
  messages: messages2,
  lastActivity: messages2[messages2.length - 1].timestamp,
  unreadCount: 2, // Mock unread count
  type: 'one-to-one',
};

initialState.currentThreadId = thread1Id;

// Create the slice
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // 1. Thread Management
    setCurrentThread: (state, action: PayloadAction<string>) => {
      state.currentThreadId = action.payload;
      // When a thread is opened, mark messages as read
      if (state.threads[action.payload]) {
        state.threads[action.payload].unreadCount = 0;
        state.threads[action.payload].messages = state.threads[action.payload].messages.map(msg => ({
            ...msg,
            isSeen: true,
            status: msg.status === 'delivered' ? 'read' : msg.status
        }));
      }
    },
    loadThreadsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadThreadsSuccess: (state, action: PayloadAction<Thread[]>) => {
      state.isLoading = false;
      action.payload.forEach(thread => {
        state.threads[thread.id] = thread;
      });
    },
    loadThreadsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addThread: (state, action: PayloadAction<Thread>) => {
      state.threads[action.payload.id] = action.payload;
    },

    // 2. Message Management
    addMessage: (state, action: PayloadAction<{ threadId: string, message: Message }>) => {
      const { threadId, message } = action.payload;
      if (state.threads[threadId]) {
        state.threads[threadId].messages.push(message);
        state.threads[threadId].lastActivity = message.timestamp;
        
        // If the message is from another user and this thread is NOT current, increase unread count
        if (message.senderId !== state.currentUserId && threadId !== state.currentThreadId) {
            state.threads[threadId].unreadCount += 1;
        }
      }
    },
    updateMessageStatus: (state, action: PayloadAction<{ threadId: string, messageId: string, status: Message['status'] }>) => {
      const { threadId, messageId, status } = action.payload;
      const thread = state.threads[threadId];
      if (thread) {
        const messageIndex = thread.messages.findIndex(m => m.id === messageId);
        if (messageIndex !== -1) {
          thread.messages[messageIndex].status = status;
        }
      }
    },
    
    // 3. Status/Activity Management (Simulating real-time updates)
    markThreadAsRead: (state, action: PayloadAction<{ threadId: string }>) => {
        const { threadId } = action.payload;
        if (state.threads[threadId]) {
            state.threads[threadId].unreadCount = 0;
            state.threads[threadId].messages = state.threads[threadId].messages.map(msg => ({
                ...msg,
                isSeen: true,
                status: msg.status === 'delivered' ? 'read' : msg.status
            }));
        }
    },
    updateUserOnlineStatus: (state, action: PayloadAction<{ userId: string, isOnline: boolean }>) => {
        const { userId, isOnline } = action.payload;
        // This is inefficient for large state, but adequate for a small Messenger clone
        Object.values(state.threads).forEach(thread => {
            const participantIndex = thread.participants.findIndex(p => p.id === userId);
            if (participantIndex !== -1) {
                thread.participants[participantIndex].isOnline = isOnline;
            }
        });
    }
  },
});

export const {
  setCurrentThread,
  loadThreadsStart,
  loadThreadsSuccess,
  loadThreadsFailure,
  addThread,
  addMessage,
  updateMessageStatus,
  markThreadAsRead,
  updateUserOnlineStatus,
} = chatSlice.actions;

export default chatSlice.reducer;

// Selectors (for use with useSelector)
export const selectThreads = (state: { chat: ChatState }) => 
    Object.values(state.chat.threads).sort((a, b) => b.lastActivity - a.lastActivity);

export const selectCurrentThread = (state: { chat: ChatState }) => 
    state.chat.currentThreadId ? state.chat.threads[state.chat.currentThreadId] : null;

export const selectCurrentUserId = (state: { chat: ChatState }) => state.chat.currentUserId;
export const selectIsLoading = (state: { chat: ChatState }) => state.chat.isLoading;