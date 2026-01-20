import { createClient } from "./supabase/client";

interface ApiRequestOptions extends RequestInit {
  token?: string;
}

export async function getAuthToken(): Promise<string | null> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token ?? null;
}

export async function apiFetch<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
  const token = options.token || (await getAuthToken());

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 204) return undefined as T;

  const data = (await res.json().catch(() => null)) as
    | T
    | { message?: string }
    | null;

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      message:
        (data as { message?: string } | null)?.message || "Request failed",
    };
    throw error;
  }

  return data as T;
}

export interface ApiError {
  status: number;
  message: string;
}
