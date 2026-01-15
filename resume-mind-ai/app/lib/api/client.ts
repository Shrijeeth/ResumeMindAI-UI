import { getAccessToken } from '@/app/lib/supabase/client';

/**
 * API Error structure
 */
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * Standardized API response wrapper
 */
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  status: number;
}

/**
 * Request options extending fetch options
 */
export interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  body?: Record<string, unknown> | FormData;
  skipAuth?: boolean;
}

/**
 * Get the API base URL from environment variables
 */
function getBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
  }
  return baseUrl;
}

/**
 * Generic API client for making authenticated requests to the backend
 */
async function apiClient<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const { body, skipAuth = false, headers: customHeaders, ...fetchOptions } = options;

  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    // Build headers
    const headers: Record<string, string> = {
      ...(customHeaders as Record<string, string>),
    };

    // Add auth token if not skipped
    if (!skipAuth) {
      const token = await getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    // Handle body - set Content-Type for JSON, skip for FormData
    let processedBody: BodyInit | undefined;
    if (body) {
      if (body instanceof FormData) {
        processedBody = body;
        // Don't set Content-Type for FormData - browser will set it with boundary
      } else {
        headers['Content-Type'] = 'application/json';
        processedBody = JSON.stringify(body);
      }
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      body: processedBody,
    });

    // Parse response
    let data: T | null = null;
    let error: ApiError | null = null;

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const json = await response.json();

      if (response.ok) {
        data = json as T;
      } else {
        error = {
          message: json.message || json.detail || 'An error occurred',
          code: json.code,
          details: json.details || json,
        };
      }
    } else if (!response.ok) {
      const text = await response.text();
      error = {
        message: text || `HTTP error ${response.status}`,
        code: `HTTP_${response.status}`,
      };
    }

    return {
      data,
      error,
      status: response.status,
    };
  } catch (err) {
    // Handle network errors or other exceptions
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
    return {
      data: null,
      error: {
        message: errorMessage,
        code: 'NETWORK_ERROR',
      },
      status: 0,
    };
  }
}

/**
 * API client with convenience methods for common HTTP verbs
 */
export const api = {
  /**
   * Make a GET request
   */
  get<T>(endpoint: string, options?: Omit<ApiRequestOptions, 'body' | 'method'>) {
    return apiClient<T>(endpoint, { ...options, method: 'GET' });
  },

  /**
   * Make a POST request
   */
  post<T>(
    endpoint: string,
    body?: Record<string, unknown> | FormData,
    options?: Omit<ApiRequestOptions, 'body' | 'method'>
  ) {
    return apiClient<T>(endpoint, { ...options, method: 'POST', body });
  },

  /**
   * Make a PUT request
   */
  put<T>(
    endpoint: string,
    body?: Record<string, unknown> | FormData,
    options?: Omit<ApiRequestOptions, 'body' | 'method'>
  ) {
    return apiClient<T>(endpoint, { ...options, method: 'PUT', body });
  },

  /**
   * Make a PATCH request
   */
  patch<T>(
    endpoint: string,
    body?: Record<string, unknown> | FormData,
    options?: Omit<ApiRequestOptions, 'body' | 'method'>
  ) {
    return apiClient<T>(endpoint, { ...options, method: 'PATCH', body });
  },

  /**
   * Make a DELETE request
   */
  delete<T>(endpoint: string, options?: Omit<ApiRequestOptions, 'body' | 'method'>) {
    return apiClient<T>(endpoint, { ...options, method: 'DELETE' });
  },
};

export default api;
