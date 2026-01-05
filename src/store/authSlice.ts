import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the user object
export interface User {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string;
  // Add other user properties as needed
}

// Define the state shape for authentication
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

// Load initial state from localStorage (if available)
try {
  const persistedState = localStorage.getItem('facebookAuth');
  if (persistedState) {
    const parsedState: AuthState = JSON.parse(persistedState);
    // Ensure that if a token exists, the user is considered authenticated
    initialState.isAuthenticated = !!parsedState.token;
    initialState.user = parsedState.user;
    initialState.token = parsedState.token;
  }
} catch (e) {
  console.error("Could not load state from localStorage", e);
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Start login process
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // Successful login
    loginSuccess: (state, action: PayloadAction<{ user: User, token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.error = null;

      // Persist state to localStorage
      try {
        localStorage.setItem('facebookAuth', JSON.stringify({
          isAuthenticated: true,
          user: state.user,
          token: state.token
        }));
      } catch (e) {
        console.error("Could not save state to localStorage", e);
      }
    },

    // Failed login
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = action.payload;
    },

    // Logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;

      // Clear state from localStorage
      try {
        localStorage.removeItem('facebookAuth');
      } catch (e) {
        console.error("Could not clear state from localStorage", e);
      }
    },

    // Update user profile information
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
        // Re-persist updated state
        try {
          localStorage.setItem('facebookAuth', JSON.stringify({
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            token: state.token
          }));
        } catch (e) {
          console.error("Could not update user state in localStorage", e);
        }
      }
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUserProfile,
} = authSlice.actions;

export default authSlice.reducer;