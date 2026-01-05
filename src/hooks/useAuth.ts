import { useState, useEffect } from 'react';
import { getCurrentUser, signInWithEmailAndPassword, signOutUser, onAuthStateChanged } from '../firebase/auth'; // Hypothetical Firebase auth wrappers
import { getUserData } from '../firebase/firestore'; // Hypothetical Firestore helper

interface UserProfile {
  uid: string;
  email: string | null;
  username?: string;
  profilePictureUrl?: string;
  // Add other relevant user profile fields
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

/**
 * Custom hook for managing authentication state.
 * Handles login, logout, and real-time user state synchronization.
 */
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const fetchUserProfile = async (firebaseUser: any): Promise<UserProfile> => {
    // Assuming firebaseUser contains basic info (uid, email)
    const basicProfile: UserProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
    };

    try {
      // Fetch additional data from Firestore (e.g., username, profile picture)
      const userData = await getUserData(firebaseUser.uid);
      return {
        ...basicProfile,
        ...userData, // Merge Firestore data
      };
    } catch (err) {
      console.error("Failed to fetch user profile data:", err);
      // Return basic profile if Firestore fails
      return basicProfile;
    }
  };

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // 1. Fetch detailed user profile
          const userProfile = await fetchUserProfile(firebaseUser);
          
          setAuthState({
            user: userProfile,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          console.error("Error setting user profile on auth state change:", error);
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error as Error,
          });
        }
      } else {
        // User logged out
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  /**
   * Log in the user.
   */
  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const firebaseUser = await signInWithEmailAndPassword(email, password);
      
      if (firebaseUser) {
        const userProfile = await fetchUserProfile(firebaseUser);

        setAuthState({
          user: userProfile,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return userProfile;
      }
    } catch (error) {
      console.error("Login failed:", error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
      throw error;
    }
  };

  /**
   * Log out the current user.
   */
  const logout = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await signOutUser();
      // The onAuthStateChanged listener handles setting the final state (user: null)
    } catch (error) {
      console.error("Logout failed:", error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
      throw error;
    }
  };

  /**
   * Helper function to check for the current state outside of the listener (e.g., initial load check).
   * Note: This is often redundant if useEffect with onAuthStateChanged is used correctly.
   */
  const initializeAuth = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    const firebaseUser = getCurrentUser(); // Synchronous check

    if (firebaseUser) {
      try {
        const userProfile = await fetchUserProfile(firebaseUser);
        setAuthState({
          user: userProfile,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error("Initialization failed:", error);
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: error as Error,
        }));
      }
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  };


  return {
    ...authState,
    login,
    logout,
    // initializeAuth, // Generally not exposed if useEffect handles listening
  };
};

// --- Context Provider setup (Optional but recommended for large apps) ---

// import React, { useContext, useMemo } from 'react';

// type AuthContextType = ReturnType<typeof useAuth>;

// const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC = ({ children }) => {
//   const auth = useAuth();
//   // Memoize the value to prevent unnecessary renders of consumers
//   const value = useMemo(() => auth, [auth.isAuthenticated, auth.isLoading, auth.user]);

//   return (
//     <AuthContext.Provider value={value}>
//       {auth.isLoading && !auth.isAuthenticated ? <div>Loading Authentication...</div> : children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuthContext must be used within an AuthProvider');
//   }
//   return context;
// };