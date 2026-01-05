import * as yup from 'yup';

// Validation schema for a user registration
export const registrationSchema = yup.object().shape({
  firstName: yup.string().trim().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: yup.string().trim().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: yup.string().trim().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  dateOfBirth: yup.date().required('Date of birth is required').nullable()
    .test('is-adult', 'You must be at least 13 years old to use Facebook', (value) => {
      if (!value) return false;
      const today = new Date();
      const minimumAgeDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
      return value <= minimumAgeDate;
    }),
  gender: yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender selection').required('Gender is required'),
});

// Validation schema for user login
export const loginSchema = yup.object().shape({
  emailOrPhone: yup.string().trim().required('Email or Phone Number is required'),
  password: yup.string().required('Password is required'),
});

// Validation schema for creating a new post
export const postSchema = yup.object().shape({
  content: yup.string().trim().min(1, 'Post content cannot be empty').max(5000, 'Post content is too long'),
  // Optional field for media (e.g., image URL or file object)
  media: yup.mixed().nullable(), 
  // Optional field for privacy setting
  privacy: yup.string().oneOf(['public', 'friends', 'only_me'], 'Invalid privacy setting').default('public'),
});

// Validation schema for updating user profile
export const profileUpdateSchema = yup.object().shape({
  bio: yup.string().trim().max(150, 'Bio must be less than 150 characters').nullable(),
  city: yup.string().trim().max(50, 'City name is too long').nullable(),
  workplace: yup.string().trim().max(50, 'Workplace name is too long').nullable(),
  // Can be URL or file object, depending on implementation
  profilePicture: yup.mixed().nullable(),
  coverPhoto: yup.mixed().nullable(),
});

// Validation schema for adding a comment
export const commentSchema = yup.object().shape({
  text: yup.string().trim().required('Comment cannot be empty').max(1000, 'Comment is too long'),
});

// Validation schema for sending a friend request (simple ID validation)
export const friendRequestSchema = yup.object().shape({
  recipientId: yup.string().required('Recipient ID is required').matches(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
});

// Validation schema for password reset request (using email)
export const passwordResetRequestSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid email address').required('Email is required'),
});

// Validation schema for setting a new password after a reset link click
export const newPasswordSchema = yup.object().shape({
  newPassword: yup.string().required('New password is required').min(6, 'Password must be at least 6 characters'),
  confirmNewPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
  // Token might be passed via URL parameter, but we validate it if it's part of a form submission
  token: yup.string().required('Reset token is missing'), 
});

// Validation schema for reporting content
export const reportContentSchema = yup.object().shape({
  contentId: yup.string().required('Content ID is required').matches(/^[0-9a-fA-F]{24}$/, 'Invalid content ID format'),
  contentType: yup.string().oneOf(['post', 'comment', 'user'], 'Invalid content type').required('Content type is required'),
  reason: yup.string().trim().required('Reason for reporting is required').min(10, 'Please provide a detailed reason'),
});