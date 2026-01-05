import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Define the base URL for the API
const BASE_URL = 'https://api.facebook.com/v1.0'; // Example, replace with actual production API base URL if needed

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Example: Authorization header usually added dynamically based on user session/token
    // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN_HERE',
  },
  timeout: 10000, // 10 seconds timeout
});

// --- Interceptors ---

// Request Interceptor: Inject Authorization token dynamically
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Retrieve authentication token from storage (e.g., localStorage, sessionStorage, or a global state manager)
    // NOTE: In a real Facebook application context, you'd manage the OAuth flow and access tokens carefully.
    const accessToken = localStorage.getItem('fb_access_token'); 

    if (accessToken) {
      // Add the token to the Authorization header
      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        config.headers = { Authorization: `Bearer ${accessToken}` };
      }

      // Facebook API often uses 'access_token' query parameter as well, depending on the endpoint/SDK usage
      // We can append it here if needed, but standard practice is usually the Authorization header.
      // config.params = { ...config.params, access_token: accessToken };
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors and standardize response structure
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // You might transform the response data here if necessary
    return response;
  },
  (error: AxiosError) => {
    // Handle API errors (4xx, 5xx status codes)
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          console.error('Unauthorized: Access token expired or invalid.', data);
          // Optional: Redirect to login page or trigger token refresh
          // e.g., window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden: Insufficient permissions.', data);
          break;
        case 404:
          console.error('Not Found: The requested resource does not exist.', data);
          break;
        case 500:
          console.error('Server Error: Something went wrong on the server.', data);
          break;
        default:
          console.error(`API Error (${status}):`, data);
      }
    } else if (error.request) {
      // The request was made but no response was received (e.g., network error, timeout)
      console.error('Network Error: No response received.', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request Setup Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// --- API Utility Functions (Wrapper) ---

interface ApiConfig extends AxiosRequestConfig {}

/**
 * Perform a GET request.
 * @param url The endpoint URL (relative to BASE_URL)
 * @param config Optional Axios configuration
 */
export const get = <T>(url: string, config?: ApiConfig): Promise<AxiosResponse<T>> => {
  return apiClient.get<T>(url, config);
};

/**
 * Perform a POST request.
 * @param url The endpoint URL (relative to BASE_URL)
 * @param data The payload to send
 * @param config Optional Axios configuration
 */
export const post = <T>(url: string, data?: any, config?: ApiConfig): Promise<AxiosResponse<T>> => {
  return apiClient.post<T>(url, data, config);
};

/**
 * Perform a PUT request.
 * @param url The endpoint URL (relative to BASE_URL)
 * @param data The payload to send
 * @param config Optional Axios configuration
 */
export const put = <T>(url: string, data?: any, config?: ApiConfig): Promise<AxiosResponse<T>> => {
  return apiClient.put<T>(url, data, config);
};

/**
 * Perform a DELETE request.
 * @param url The endpoint URL (relative to BASE_URL)
 * @param config Optional Axios configuration
 */
export const remove = <T>(url: string, config?: ApiConfig): Promise<AxiosResponse<T>> => {
  return apiClient.delete<T>(url, config);
};

// Export the underlying Axios instance (optional, but useful for advanced configurations)
export default apiClient;