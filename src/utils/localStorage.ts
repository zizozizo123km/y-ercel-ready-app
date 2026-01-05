// A wrapper utility for localStorage operations, providing type safety and graceful error handling
// especially for environments where localStorage might be unavailable or restricted (e.g., private browsing, SSR).

type StorageValue = string | number | object | boolean | null | undefined;

/**
 * Checks if localStorage is accessible and available.
 * @returns The Storage object if available, otherwise null.
 */
const getStorageInstance = (): Storage | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const storage = window.localStorage;
    // Perform a quick test to ensure read/write access
    const testKey = '__storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return storage;
  } catch (e) {
    // This catches QuotaExceededError, SecurityError, etc.
    console.warn('Local storage is unavailable or access is denied.', e);
    return null;
  }
};

const storageInstance = getStorageInstance();


/**
 * Retrieves a value from local storage by key.
 * Attempts to parse the value as JSON.
 * @param key The storage key.
 * @returns The parsed value or null if not found or if storage is unavailable.
 */
export function get<T extends StorageValue>(key: string): T | null {
  if (!storageInstance) {
    return null;
  }

  try {
    const item = storageInstance.getItem(key);
    if (item === null) {
      return null;
    }

    // Attempt to parse JSON
    try {
      return JSON.parse(item) as T;
    } catch {
      // If parsing fails, return the raw string (useful for tokens/simple strings)
      return item as unknown as T;
    }
  } catch (error) {
    console.error(`[LocalStorage] Error reading key "${key}":`, error);
    return null;
  }
}

/**
 * Sets a value in local storage. Automatically stringifies objects.
 * @param key The storage key.
 * @param value The value to store.
 * @returns True if the value was successfully set, false otherwise.
 */
export function set<T extends StorageValue>(key: string, value: T): boolean {
  if (!storageInstance) {
    return false;
  }

  try {
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
    storageInstance.setItem(key, serializedValue);
    return true;
  } catch (error) {
    // Usually QuotaExceededError
    console.error(`[LocalStorage] Error setting key "${key}":`, error);
    return false;
  }
}

/**
 * Removes a specific key from local storage.
 * @param key The storage key to remove.
 */
export function remove(key: string): void {
  if (!storageInstance) {
    return;
  }
  try {
    storageInstance.removeItem(key);
  } catch (error) {
    console.error(`[LocalStorage] Error removing key "${key}":`, error);
  }
}

/**
 * Clears all items from local storage. Use with caution.
 */
export function clear(): void {
  if (!storageInstance) {
    return;
  }
  try {
    storageInstance.clear();
  } catch (error) {
    console.error('[LocalStorage] Error clearing storage:', error);
  }
}

// Optional utility for common Facebook app storage keys (e.g., Auth Token)
export const StorageKeys = {
  AUTH_TOKEN: 'fb_auth_token',
  USER_PREFS: 'fb_user_preferences',
  LAST_VIEWED_FEED_TIME: 'fb_last_feed_time',
};

// Example specific methods for ease of use
export const localStorageUtils = {
  get,
  set,
  remove,
  clear,
  keys: StorageKeys,
  setAuthToken: (token: string) => set(StorageKeys.AUTH_TOKEN, token),
  getAuthToken: () => get<string>(StorageKeys.AUTH_TOKEN),
};

export default localStorageUtils;