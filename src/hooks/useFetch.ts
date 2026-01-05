import { useState, useEffect, useCallback } from 'react';

// Define the interface for the fetch options, extending standard RequestInit
interface FetchOptions extends RequestInit {
  skip?: boolean; // Option to skip the initial fetch
}

// Define the interface for the hook's return value
interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: (newUrl?: string, newOptions?: FetchOptions) => Promise<void>;
}

/**
 * A custom hook for handling API requests.
 * Manages loading state, data, and errors, and provides a refetch mechanism.
 *
 * @param initialUrl The URL endpoint to fetch from.
 * @param initialOptions Optional request configuration (e.g., method, headers, body).
 * @returns An object containing data, loading state, error, and a refetch function.
 */
function useFetch<T = unknown>(
  initialUrl: string,
  initialOptions: FetchOptions = {}
): FetchResult<T> {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!initialOptions.skip);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (currentUrl: string, currentOptions: FetchOptions) => {
      // If the options dictate skipping the fetch and we're just starting, exit early.
      if (currentOptions.skip && data === null && error === null) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(currentUrl, currentOptions);

        if (!response.ok) {
          // Attempt to read error message from body if available, otherwise use status text
          const errorBody = await response.text();
          let errorMessage = response.statusText;
          try {
            const jsonError = JSON.parse(errorBody);
            errorMessage = jsonError.message || errorMessage;
          } catch (e) {
            // If body is not JSON, use the raw text if it seems meaningful
            if (errorBody.length > 0 && errorBody.length < 500) {
                 errorMessage = errorBody;
            }
          }

          throw new Error(`HTTP error! Status: ${response.status} - ${errorMessage}`);
        }

        const result: T = await response.json();
        setData(result);
      } catch (err) {
        // Ensure error is of type Error
        const fetchError = err instanceof Error ? err : new Error('An unknown error occurred during fetch.');
        setError(fetchError);
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [data, error] // Dependencies to prevent stale state in refetching logic
  );

  // Initial fetch effect
  useEffect(() => {
    if (!options.skip) {
      fetchData(url, options);
    }
  }, [url, options, fetchData]);

  // Function exposed to users to manually trigger a fetch
  const refetch = useCallback(
    async (newUrl?: string, newOptions?: FetchOptions) => {
      const fetchUrl = newUrl || url;
      const fetchOptions = newOptions ? { ...options, ...newOptions, skip: false } : { ...options, skip: false }; // Ensure skip is false for explicit refetch

      // Update state for subsequent automatic fetches if URL/options changed
      if (newUrl) setUrl(newUrl);
      if (newOptions) setOptions(fetchOptions);

      // Perform the fetch immediately
      await fetchData(fetchUrl, fetchOptions);
    },
    [url, options, fetchData]
  );

  return { data, loading, error, refetch };
}

export default useFetch;