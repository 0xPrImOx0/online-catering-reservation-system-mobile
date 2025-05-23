import { useEffect, useState } from "react";
import axios from "axios";
import {
  initSocket,
  subscribeToMenuCreated,
  subscribeToMenuUpdates,
  subscribeToMenuDeleted,
  unsubscribeFromMenuCreated,
  unsubscribeFromMenuUpdates,
  unsubscribeFromMenuDeleted,
} from "~/lib/socket";
import { MenuItem } from "~/types/menu-types";
import api from "~/lib/axiosInstance";

// Internal hook for socket management
const useSocketMenus = ({
  onMenuUpdated,
  onMenuCreated,
  onMenuDeleted,
}: {
  onMenuUpdated: (menu: MenuItem) => void;
  onMenuCreated: (menu: MenuItem) => void;
  onMenuDeleted: (menu: MenuItem) => void;
}) => {
  useEffect(() => {
    initSocket();

    subscribeToMenuUpdates(onMenuUpdated);
    subscribeToMenuCreated(onMenuCreated);
    subscribeToMenuDeleted(onMenuDeleted);

    return () => {
      unsubscribeFromMenuUpdates();
      unsubscribeFromMenuCreated();
      unsubscribeFromMenuDeleted();
    };
  }, [onMenuUpdated, onMenuCreated, onMenuDeleted]);
};

// Main hook for menus data management
export const useMenus = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle menu updates from socket
  const handleMenuUpdated = (updatedMenu: MenuItem) => {
    console.log("🔄 Received updated menu from socket:", updatedMenu);
    setMenus((prev) =>
      prev.map((menu) => (menu._id === updatedMenu._id ? updatedMenu : menu))
    );
  };

  // Handle new menu creation from socket
  const handleMenuCreated = (newMenu: MenuItem) => {
    console.log("🆕 New menu created from socket:", newMenu);
    setMenus((prev) => [...prev, newMenu]);
  };

  // Handle menu deletion from socket
  const handleMenuDeleted = (deletedMenu: MenuItem) => {
    console.log("❌ Menu deleted from socket:", deletedMenu);
    setMenus((prev) => prev.filter((menu) => menu._id !== deletedMenu._id));
  };

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

  // Initialize data fetching
  useEffect(() => {
    fetchMenus();
  }, []);

  // Set up socket listeners
  useSocketMenus({
    onMenuUpdated: handleMenuUpdated,
    onMenuCreated: handleMenuCreated,
    onMenuDeleted: handleMenuDeleted,
  });

  return {
    menus,
    isLoading,
    error,
    refresh: fetchMenus,
  };
};

// Export the hook as default for easier imports
export default useMenus;
