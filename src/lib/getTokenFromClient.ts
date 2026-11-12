
"use client";

import { authClient } from "./auth-client";

export const getTokenFromClient = async () => {
  const { data, error } = await authClient.token();

  if (error) {
    console.error("JWT Error Details:", {
      message: error.message,
      status: error.status,
      statusText: error.statusText,
    });

    return null;
  }

  return data?.token ?? null;
};
