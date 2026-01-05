export const FACEBOOK_APP_NAME = 'تطبيق فيسبوك';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
export const FACEBOOK_BLUE = '#1877f2'; // Standard Facebook blue color
export const FACEBOOK_GRAY_LIGHT = '#f0f2f5'; // Light gray background
export const FACEBOOK_GRAY_MEDIUM = '#606770'; // Medium gray text/icons

// Constants for UI/Layout
export const HEADER_HEIGHT = '56px';
export const LEFT_SIDEBAR_WIDTH = '280px';
export const RIGHT_SIDEBAR_WIDTH = '360px';
export const MAX_CONTENT_WIDTH = '940px'; // Typical Facebook feed width

// User Session/Authentication
export const AUTH_TOKEN_KEY = 'fb_auth_token';
export const REFRESH_TOKEN_KEY = 'fb_import_refresh_token'; // Assuming JWT or similar mechanism
export const ACCESS_TOKEN_EXPIRY_MINUTES = 60; // Example

// Post/Feed Constants
export const POST_FETCH_LIMIT = 10;
export const MAX_POST_CONTENT_LENGTH = 10000;
export const MAX_COMMENT_LENGTH = 500;

// Media Upload Limits (Example)
export const MAX_PHOTO_SIZE_MB = 5;
export const MAX_VIDEO_SIZE_MB = 100;
export const SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/gif'];
export const SUPPORTED_VIDEO_FORMATS = ['video/mp4', 'video/quicktime'];

// Notification Types (Example)
export enum NotificationType {
  LIKE = 'LIKE',
  COMMENT = 'COMMENT',
  POST_TAG = 'POST_TAG',
  FRIEND_REQUEST = 'FRIEND_REQUEST',
  GROUP_INVITE = 'GROUP_INVITE',
  SHARED_POST = 'SHARED_POST',
}

// Environment Modes
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_BROWSER = typeof window !== 'undefined';

// Debounce/Throttle Timings
export const DEBOUNCE_SEARCH_MS = 300;
export const THROTTLE_SCROLL_MS = 150;