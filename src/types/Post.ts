import { IUser } from './User';

export interface IPost {
  id: string;
  author: IUser;
  content: string;
  createdAt: Date;
  updatedAt?: Date;

  // Media (Optional)
  mediaUrl?: string; // URL to an image or video asset
  mediaType?: 'image' | 'video';

  // Engagement Metrics
  likesCount: number;
  commentsCount: number;
  sharesCount: number;

  // Detailed Engagement (For quick checks, usually limited)
  likedBy: string[]; // Array of User IDs who liked the post

  // Privacy and Visibility
  privacy: 'public' | 'friends' | 'only_me' | 'custom';
  location?: string; // Optional geo-tagging

  // Status
  isDeleted: boolean;
}

export type PostId = string;
export type PostContent = Pick<IPost, 'content' | 'mediaUrl' | 'mediaType' | 'privacy'>;