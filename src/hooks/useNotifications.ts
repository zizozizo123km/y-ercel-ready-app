import { useState, useEffect, useCallback } from 'react';
import { Notification, NotificationType } from '../types/common';
import { fetchNotifications, markAsRead } from '../api/notifications';
import useAuth from './useAuth';
import useWebSocket from './useWebSocket';

// Initial state for notifications
const initialState: Notification[] = [];

/**
 * Custom hook for managing notifications, including fetching, real-time updates,
 * and state management.
 */
const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  const { user, isAuthenticated } = useAuth();

  // Establish WebSocket connection for real-time updates
  const wsUrl = user ? `${process.env.REACT_APP_WS_URL}/notifications?userId=${user.id}` : null;
  const { lastMessage } = useWebSocket(wsUrl, isAuthenticated);

  /**
   * Calculates if there are any unread notifications.
   * @param notifs The list of notifications to check.
   */
  const calculateHasUnread = (notifs: Notification[]) => {
    setHasUnread(notifs.some(n => !n.isRead));
  };

  /**
   * Fetches the initial list of notifications from the API.
   */
  const loadNotifications = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setNotifications(initialState);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchNotifications();
      setNotifications(data);
      calculateHasUnread(data);
    } catch (err) {
      console.error('Failed to load notifications:', err);
      setError('Failed to load notifications.');
      setNotifications(initialState);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  /**
   * Handles incoming WebSocket messages for new notifications.
   */
  useEffect(() => {
    if (lastMessage) {
      try {
        const message = JSON.parse(lastMessage.data);
        if (message.type === 'NEW_NOTIFICATION' && message.payload) {
          const newNotification: Notification = message.payload;
          
          setNotifications(prev => {
            const newNotifs = [newNotification, ...prev];
            calculateHasUnread(newNotifs);
            return newNotifs;
          });
          
          // Optionally show a toast/in-app alert here
          console.log('New notification received:', newNotification.message);
        }
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
      }
    }
  }, [lastMessage]);

  /**
   * Marks a specific notification or all notifications as read.
   * @param notificationId Optional ID of the notification to mark. If null, marks all as read.
   */
  const markNotificationAsRead = useCallback(async (notificationId: string | null = null) => {
    if (!isAuthenticated) return;

    try {
      await markAsRead(notificationId);
      
      setNotifications(prev => {
        let updatedNotifs: Notification[];
        
        if (notificationId) {
          // Mark specific notification
          updatedNotifs = prev.map(n => 
            n.id === notificationId ? { ...n, isRead: true } : n
          );
        } else {
          // Mark all notifications
          updatedNotifs = prev.map(n => ({ ...n, isRead: true }));
        }

        calculateHasUnread(updatedNotifs);
        return updatedNotifs;
      });

    } catch (err) {
      console.error('Failed to mark notification(s) as read:', err);
      // Optional: Re-fetch or show error to user
    }
  }, [isAuthenticated]);

  /**
   * Helper function to determine the icon for a notification based on its type.
   * NOTE: In a real app, this logic might live in a UI utility file.
   */
  const getNotificationIcon = useCallback((type: NotificationType) => {
    switch (type) {
      case NotificationType.LIKE:
        return '❤️'; // Or a proper icon component name/path
      case NotificationType.COMMENT:
        return '💬';
      case NotificationType.FRIEND_REQUEST:
        return '🧑‍🤝‍🧑';
      case NotificationType.POST_MENTION:
        return '@';
      default:
        return '🔔';
    }
  }, []);

  return {
    notifications,
    isLoading,
    error,
    hasUnread,
    loadNotifications,
    markNotificationAsRead,
    getNotificationIcon,
  };
};

export default useNotifications;