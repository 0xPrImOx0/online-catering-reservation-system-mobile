import { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem } from "~/types/menu-types";
import api from "~/lib/axiosInstance";

/**
 * Hook for fetching menu data without WebSocket updates
 * @returns An object containing menus, loading state, error state, and refresh function
 */
export const useApiMenus = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch menus from API
  const fetchMenus = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/menus");
      setMenus(response.data.data);
    } catch (err) {
      console.error("Error fetching menus:", err);
      const errorMessage = axios.isAxiosError<{ error: string }>(err)
        ? err.response?.data.error || "Failed to fetch menus"
        : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchMenus();
  }, []);

  return {
    menus,
    isLoading,
    error,
    refresh: fetchMenus,
  };
};

export default useApiMenus;
