interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  timestamp: Date;
  likes: string[]; // Array of User IDs who liked the comment
  repliesToCommentId?: string; // Optional: If this comment is a reply to another comment
}

export default Comment;