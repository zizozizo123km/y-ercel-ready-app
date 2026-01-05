import { format, formatDistanceToNow, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
import { ar } from 'date-fns/locale';

const LOCALE = ar;

export const formatDate = (date: Date | string | number, dateFormat = 'd MMMM, yyyy') => {
  try {
    return format(new Date(date), dateFormat, { locale: LOCALE });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const formatTime = (date: Date | string | number, timeFormat = 'h:mm a') => {
  try {
    return format(new Date(date), timeFormat, { locale: LOCALE });
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
};

export const formatDateTime = (date: Date | string | number, dateTimeFormat = 'd MMMM, yyyy h:mm a') => {
  try {
    return format(new Date(date), dateTimeFormat, { locale: LOCALE });
  } catch (error) {
    console.error('Error formatting date time:', error);
    return '';
  }
};

/**
 * Formats the date similar to Facebook's relative time, e.g., "5m", "1h", "2d", or full date if older.
 * @param date The date to format.
 * @returns A formatted string representing the time elapsed.
 */
export const formatRelativeTime = (date: Date | string | number): string => {
  const pastDate = new Date(date);
  const now = new Date();

  // If the date is invalid, return an empty string
  if (isNaN(pastDate.getTime())) {
    return '';
  }

  const minutes = differenceInMinutes(now, pastDate);

  if (minutes < 1) {
    return 'الآن'; // Just now
  }

  if (minutes < 60) {
    // Less than an hour: show minutes
    return `${minutes}د`; // e.g., 5د (5 minutes ago)
  }

  const hours = differenceInHours(now, pastDate);

  if (hours < 24) {
    // Less than a day: show hours
    return `${hours}س`; // e.g., 2س (2 hours ago)
  }

  const days = differenceInDays(now, pastDate);

  if (days < 7) {
    // Less than a week: show days
    return `${days}يوم`; // e.g., 2يوم (2 days ago)
  }

  // If older than a week, use the standard relative time function or specific format
  // Facebook often shows "d Month at h:mm a" for older posts.

  // If it's the current year, show "d MMMM at h:mm a"
  if (pastDate.getFullYear() === now.getFullYear()) {
    // Example: 25 نوفمبر في 7:30 م
    return format(pastDate, 'd MMMM في h:mm a', { locale: LOCALE });
  }

  // If it's a previous year, show "d MMMM, yyyy at h:mm a"
  // Example: 15 يناير، 2023 في 10:00 ص
  return format(pastDate, 'd MMMM, yyyy في h:mm a', { locale: LOCALE });
};

/**
 * Formats the distance between a date and now using full words (e.g., "5 minutes ago").
 * Useful for details where exact phrasing is preferred.
 */
export const formatDistance = (date: Date | string | number, addSuffix = true): string => {
  try {
    return formatDistanceToNow(new Date(date), {
      locale: LOCALE,
      addSuffix: addSuffix,
    });
  } catch (error) {
    console.error('Error formatting distance:', error);
    return '';
  }
};